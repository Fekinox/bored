import express from 'express'
import {
    signup,
    login,
    logout,
} from "../controllers/authControllers.js"
import isUserLoggedIn from '../utils/authentication.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', isUserLoggedIn, logout)

export default router
