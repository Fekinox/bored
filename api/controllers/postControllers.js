import "dotenv/config.js"
import Post from "../models/Post.js";
import Tag from "../models/Tag.js";
import ImgurFile from "../models/ImgurFile.js";
import getNextSequence from "../utils/getNextSequence.js";
import { uploadImage } from "../utils/imgur.js";

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

// NOTE: createPost is non-atomic! 
export const createPost = async (req, res) => {
    // Upload the given file to imgur.
    // If successful, create a new imgur file and create a corresponding
    // post that contains that imgur file.
    let savedImage
    try {
        const newImageId = await getNextSequence("file")
        savedImage = await uploadImage(req.body, req.file, newImageId)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
        return
    }

    let post
    try {
        const newPostId = await getNextSequence("post")

        post = new Post({
            title: req.body.title,
            description: req.body.description,
            files: [savedImage["_id"]],
            tags: [],
        })

        const savedPost = await post.save()
        res.status(201).json(savedPost)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal error" })
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({postId: req.params.id})
        if (post) {
            res.json({ message: "Post deleted" })
        } else {
            res.status(404).json({ message: `Post with id ${req.params.id} not found` })
        }
    } catch (error) {
        res.status(500).json({ message: "internal error" })
    }
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