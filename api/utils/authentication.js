import "dotenv/config.js"
import jwt from 'jsonwebtoken'
import createHttpError from "http-errors"

async function isUserLoggedIn(req, res, next) {
    try {
        const { boredAppToken = false } = req.cookies
        if (!boredAppToken) { throw "Not Logged In" }
        const payload = await jwt.verify(boredAppToken, process.env.AUTH_SECRET)
        req.payload = payload
        next()
    } catch (error) {
        console.log(error)
        next(createHttpError(400, "Must be logged in to perform this action"))
    }
}

export default isUserLoggedIn
