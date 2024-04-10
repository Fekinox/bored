import "dotenv/config.js"
import Post from "../models/Post.js";
import Tag from "../models/Tag.js";
import ImgurFile from "../models/ImgurFile.js";
import getNextSequence from "../utils/getNextSequence.js";
import { uploadImage } from "../utils/imgur.js";
import db from "../config/database.js"

import createHttpError from "http-errors";

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('files')
        res.json(posts)
    } catch (error) {
        next(createHttpError(500, error.message))
    }
}

export const getPostById = async (req, res, next) => {
    try {
        const post = await Post.findOne({postId: req.params.id}).populate('files')
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
            let post = new Post({
                title: req.body.title,
                description: req.body.description,
                postId: newPostId,
                files: [image["_id"]],
                tags: [],
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

    try {
        await session.withTransaction(async () => {
            let post = await 
                Post.findOne({postId: req.params.id})
                    .session(session)
                    .populate('files')
                    .exec()

            if (!post) {
                throw new Error("post does not exist")
            }

            await Promise.all(
                post.files.map((file) => {
                    return file.deleteOne()
                })
            )

            await post.deleteOne()
        })
        res.status(200).json({ message: "Post deleted" })
    } catch (error) {
        next(createHttpError(500, error.message))
    }
    await session.endSession()
}

export const addFileToPost = async (req, res) => {
    res.status(200).json({ message: `Adding file to post ${req.params.id}` })
}

export const addTags = async (req, res) => {
    res.status(200).json({ message: `Assigning ${req.params.id} to tags` })
}

export const setMetadata = async (req, res) => {
    res.status(200).json({ message: `Updated metadata of post ${req.params.id}` })
}

export const removeFileFromPost = async (req, res) => {
    res.status(200).json({ message: `Removing file ${req.params.fileId} from post ${req.params.id}` })
}

export const removeTags = async (req, res) => {
    res.status(200).json({ message: `Removing tags from ${req.params.id}` })
}
