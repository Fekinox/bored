import User from '../models/User.js'
import Profile from '../models/Profile.js'

export const getAllUsers = async (req, res) => {
    res.status(200).json({ message: "Getting all users" })
}

export const getUserByUsername = async (req, res) => {
    res.status(200).json({ message: `Getting user named ${req.params.username}` })
}

export const getUserFavorites = async (req, res) => {
    res.status(200).json({ message: `Getting ${req.params.username}'s favorites ` })
}

export const addPostToFavorites  = async (req, res) => {
    res.status(200).json({ message: `Adding post to ${req.params.username}'s favorites` })
}

export const removePostFromFavorites  = async (req, res) => {
    res.status(200).json({ message: `Removing post from ${req.params.username}'s favorites` })
}
