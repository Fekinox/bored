import "dotenv/config.js"
import Post from "../models/Post.js";
import Tag from "../models/Tag.js";
import ImgurFile from "../models/ImgurFile.js";
import getNextSequence from "../utils/getNextSequence.js";
import { uploadImage } from "../utils/imgur.js";
import db from "../config/database.js"

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (error) {
        res.status(500).json({ message: "internal error" })
    }
}

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findOne({postId: req.params.id})
        res.json(post)
    } catch (error) {
        res.status(500).json({ message: "internal error" })
    }
}

export const createPost = async (req, res) => {
    // Upload the given file to imgur.
    // If successful, create a new imgur file and create a corresponding
    // post that contains that imgur file.
    let session
    try {
        session = await db.startSession()
    } catch(e) {
        res.status(500).json({ message: "internal error" })
        return
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
            // await session.endSession()
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "internal error" })
    }

    await db.endSession()
}

export const deletePost = async (req, res) => {
    let session
    try {
        session = await db.startSession()
    } catch(e) {
        res.status(500).json({ message: "internal error" })
        return
    }

    try {
        await session.withTransaction(async () => {
            let post = await 
                Post.findOne({postId: req.params.id})
                    .session(session)
                    .populate('files')
                    .exec()

            console.log(post)

            await Promise.all(
                post.files.map((file) => {
                    return file.deleteOne()
                })
            )

            await post.deleteOne()
        })
        res.status(200).json({ message: "Post deleted" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "internal error" })
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
