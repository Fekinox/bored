import 'dotenv/config.js'
import Profile from '../models/Profile.js';
import User from '../models/User.js'
import createHttpError from "http-errors";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const signup = async (req, res, next) => {
    // Check if user already exists; if so, fail
    const foundUser = await User.findOne({ user: req.body.user })
    if (foundUser) {
        return next(createHttpError(409, `User ${req.body.user} already exists`))
    }

    const passwordHash = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))

    let profile
    try {
        profile = await Profile.create({})
    } catch (error) {
        return next(createHttpError(500, "Error creating profile"))
    }

    try {
        const user = await User.create({
            user: req.body.user,
            password: passwordHash,
            profile: profile._id
        })
        res.status(201).json({ message: `Successfully created user ${user.user}` })
    } catch (error) {
        next(createHttpError(500, error))
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ user: req.body.user })
        if (!user) {
            return next(createHttpError(404, `User ${req.body.user} not found`))
        }

        const result = await bcrypt.compare(req.body.password, user.password)
        if (!result) {
            return next(createHttpError(400), `Password does not match`)
        }

        const payload = { username: user.user }
        const token = jwt.sign(
            payload,
            process.env.AUTH_SECRET, 
            { expiresIn: '1d' },
        )

        res.cookie('boredAppToken', token, { httpOnly: true }).json({
            message: `Successfully logged in as ${user.user}`
        })
    } catch(error) {
        next(createHttpError(500, error))
    }
}

export const logout = async (req, res, next) => {
    res.clearCookie('boredAppToken')
        .json({ message: `Successfully logged out` })
}

export const getLoginStatus = async (req, res, next) => {
    try {
        const { boredAppToken = false } = req.cookies
        if (!boredAppToken) { throw "Not Logged In" }
        const payload = await jwt.verify(boredAppToken, process.env.AUTH_SECRET)
        res.json({
            status: "logged in",
            user: payload.username,
        })
    } catch (error) {
        res.json({
            status: "not logged in",
        })
    }
}
