import "dotenv/config.js"
import Post from "../models/Post.js";
import Tag from "../models/Tag.js";
import ImgurFile from "../models/ImgurFile.js";
import getNextSequence from "../utils/getNextSequence.js";
import { uploadImage } from "../utils/imgur.js";
import db from "../config/database.js"
import { getTag, getAllTags, parseTagQuery } from "../utils/tag.js"

import createHttpError from "http-errors";

export const getPosts = async (req, res, next) => {
    try {
        let tagQuery = {}
        let pageIndex = 1

        if (req.query.tags) {
            try {
                tagQuery = await parseTagQuery(req.query.tags)
            } catch (error) {
                return res.json([])
            }
        }

        if (req.query.page) {
            pageIndex = req.query.page
        }

        const posts = await Post.paginate(tagQuery, pageIndex)

        res.json(posts)
    } catch (error) {
        next(createHttpError(500, error.message))
    }
}

export const getPostById = async (req, res, next) => {
    try {
        const post = await Post
            .findOne({postId: req.params.id})
            .populate('file')
            .populate('tags')

        if (!post) {
            next(createHttpError(404, `Post ${id} not found`))
        }
        res.json(post)
    } catch (error) {
        next(createHttpError(500, error.message))
    }
}

export const createPost = async (req, res, next) => {
    // Upload the given file to imgur.
    // If successful, create a new imgur file and create a corresponding
    // post that contains that imgur file.
    let session
    try {
        session = await db.startSession()
    } catch(e) {
        next(createHttpError(500, error.message))
    }

    try {
        await session.withTransaction(async () => {
            const newImageId = await getNextSequence("file", { session: session })
            let image = await uploadImage(req.body, req.file, newImageId)
            await image.save({ session: session })

            const newPostId = await getNextSequence("post", { session: session })
            const tags = await getAllTags(req.body.tags)

            // Add a tag representing the logged-in user
            const artistTag = await getTag(`artist:${req.payload.username}`)
            tags.push(artistTag)

            let post = new Post({
                title: req.body.title,
                description: req.body.description,
                postId: newPostId,
                file: image["_id"],
                tags: tags.map((t) => t._id),
            })

            const savedPost = await post.save({ session: session })
            res.status(201).json(savedPost)
        })
    } catch (error) {
        next(createHttpError(500, error.message))
    }

    await session.endSession()
}

export const deletePost = async (req, res, next) => {
    let session
    try {
        session = await db.startSession()
    } catch(e) {
        next(createHttpError(500, error.message))
    }

    let post
    try {
        post = await 
            Post.findOne({postId: req.params.id})
            .session(session)
            .populate('file')
            .populate('tags')
            .exec()

        if (!post) {
            return next(createHttpError(404, "Post does not exist"))
        }

        // Check that user owns this post
        if (!post.tags.find((t) => {
            return t.name == req.payload.username &&
                t.namespace == 'artist'
        })) {
            return next(createHttpError(403, "You do not own this post"))
        }
    } catch (error) {
        throw createHttpError(500, error)
    }

    try {
        await session.withTransaction(async () => {

            await post.file.deleteOne()
            await post.deleteOne()

            res.status(200).json({ message: "Post deleted" })
        })
    } catch (error) {
        next(createHttpError(500, error.message))
    }
    await session.endSession()
}

export const addTags = async (req, res, next) => {
    let post
    try {
        post = await
            Post.findOne({postId: req.params.id})
                .populate('file')
                .populate('tags')
        if (!post) {
            return next(createHttpError(404, "Post does not exist"))
        }
        // Check that user owns this post
        if (!post.tags.find((t) => {
            return t.name == req.payload.username &&
                t.namespace == 'artist'
        })) {
            return next(createHttpError(403, "You do not own this post"))
        }

        let tagsToAdd = []
        for (const tag of req.body) {
            try {
                const tagItem = await getTag(tag, {
                    notInNamespaces: [ "artist", ]
                }) 
                tagsToAdd.push(tagItem._id)
            } catch (error) {
                continue
            }
        }

        await Post.updateOne(
            { postId: req.params.id },
            {
                $addToSet: {
                    tags: tagsToAdd,
                },
                lastModifiedDate: new Date()
            }
        )
    } catch (error) {
        return next(createHttpError(500, error.message))
    }


    res.json({ message: "Successfully added tags to post" })
}

export const removeTags = async (req, res, next) => {
    let post
    try {
        post = await
            Post.findOne({postId: req.params.id})
                .populate('file')
                .populate('tags')
        if (!post) {
            return next(createHttpError(404, "Post does not exist"))
        }
        // Check that user owns this post
        if (!post.tags.find((t) => {
            return t.name == req.payload.username &&
                t.namespace == 'artist'
        })) {
            return next(createHttpError(403, "You do not own this post"))
        }

        let tagsToPull = []
        for (const tag of req.body) {
            try {
                const tagItem = await getTag(tag, {
                    mustExist: true,
                    notInNamespaces: [ "artist" ],
                })
                tagsToPull.push(tagItem._id)
            } catch (error) {
                continue
            }
        }

        await Post.updateOne(
            { postId: req.params.id },
            {
                $pull: {
                    tags: { $in: tagsToPull },
                },
                lastModifiedDate: new Date()
            }
        )

    } catch (error) {
        return next(createHttpError(500, error.message))
    }

    res.json({ message: "Successfully removed tags to post" })
}

export const setMetadata = async (req, res, next) => {
    let post
    try {
        post = await
            Post.findOne({postId: req.params.id})
                .populate('file')
                .populate('tags')
        if (!post) {
            return next(createHttpError(404, "Post does not exist"))
        }
        // Check that user owns this post
        if (!post.tags.find((t) => {
            return t.name == req.payload.username &&
                t.namespace == 'artist'
        })) {
            return next(createHttpError(403, "You do not own this post"))
        }

        let update = {
            lastModifiedDate: new Date()
        }
        if (req.body.title !== undefined) {
            update.title = req.body.title
        }

        if (req.body.description !== undefined) {
            update.description = req.body.description
        }

        await Post.updateOne(
            { postId: req.params.id },
            update
        )

    } catch (error) {
        return next(createHttpError(500, error.message))
    }

    res.json({ message: "Successfully updated metadata" })
}
