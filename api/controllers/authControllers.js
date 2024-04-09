import User from '../models/User.js'

export const signup = async (req, res) => {
    res.status(200).json({ message: "Signing up" })
}

export const login = async (req, res) => {
    res.status(200).json({ message: "Logging in" })
}

export const logout = async (req, res) => {
    res.status(200).json({ message: "Logging out" })
}
