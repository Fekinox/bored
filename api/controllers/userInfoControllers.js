import User from '../models/User.js'
import Profile from '../models/Profile.js'
import createHttpError from 'http-errors'
import Post from '../models/Post.js'
import { getTag, parseTagQuery } from '../utils/tag.js'

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await
            User.find({}, 'user profile')
                .populate('profile')
        res.json(users)
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

export const getUserByUsername = async (req, res, next) => {
    try {
        const user = await
            User.findOne({ user: req.params.username }, 'user profile')
                .populate('profile')
        if (!user) {
            return next(createHttpError(404, 'User not found'))
        }
        res.json(user)
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

export const getPostsByUser = async (req, res, next) => {
    try {
        const user = await
            User.findOne({ user: req.params.username }, 'user profile')
        if (!user) {
            return next(createHttpError(404, 'User not found'))
        }

        let artistTag
        try {
            artistTag = await getTag(`artist:${req.params.username}`, {
                mustExist: true,
            })
        } catch (error) {
            console.log(error)
            return next(createHttpError(404, 'User has no submitted posts'))
        }

        let searchQuery = { tags: artistTag._id }
        let pageIndex = 1
        if (req.query.tags) {
            let q
            try {
                q = await parseTagQuery(req.query.tags)
            } catch (error) {
                console.log(error)
                return res.json([])
            }
            searchQuery = { $and: [
                { tags: artistTag._id },
                q
            ] }
        } 

        if (req.query.page) {
            pageIndex = req.query.page
        }

        const posts = await Post.paginate(searchQuery, pageIndex)

        res.json(posts)
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

export const getUserFavorites = async (req, res, next) => {
    try {
        const user = await
            User.findOne({ user: req.params.username }, 'user profile')
                .populate({
                    path: 'profile',
                    populate: {
                        path: 'favorites',
                    }
                })
        if (!user) {
            return next(createHttpError(404, 'User not found'))
        }
        res.json(user.profile.favorites)
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

export const addPostToFavorites  = async (req, res, next) => {
    if (req.params.username !== req.payload.username) {
        return next(createHttpError(403, 'You cannot modify another user\'s favorites'))
    }

    try {
        const user = await
            User.findOne({ user: req.params.username })

        if (!user) {
            return next(createHttpError(404, 'User not found'))
        }

        const post = await
            Post.findOne({ postId: req.params.postId })

        if (!post) {
            return next(createHttpError(404, 'Post not found'))
        }

        await Profile.updateOne(
            { _id: user.profile._id },
            { $addToSet: { favorites: post._id } }
        )

        res.status(201).json({ message: "Successfully added post to favorites" })
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

export const removePostFromFavorites  = async (req, res, next) => {
    if (req.params.username !== req.payload.username) {
        return next(createHttpError(403, 'You cannot modify another user\'s favorites'))
    }

    try {
        const user = await
            User.findOne({ user: req.params.username })

        if (!user) {
            return next(createHttpError(404, 'User not found'))
        }

        const post = await
            Post.findOne({ postId: req.params.postId })

        if (!post) {
            return next(createHttpError(404, 'Post not found'))
        }

        await Profile.updateOne(
            { _id: user.profile._id },
            { $pull: { favorites: post._id } }
        )

        res.json({ message: "Successfully removed post from favorites" })
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

export const setUserDescription = async (req, res, next) => {
    if (req.params.username !== req.payload.username) {
        return next(createHttpError(403, 'You cannot modify another user\'s description'))
    }

    try {
        const user = await
            User.findOne({ user: req.params.username })

        if (!user) {
            return next(createHttpError(404, 'User not found'))
        }

        user.description = req.body
        await user.save()
        res.json({ message: "Successfully updated user description" })
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}
