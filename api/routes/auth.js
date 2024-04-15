import express from 'express'
import {
    signup,
    login,
    logout,
    getLoginStatus,
} from "../controllers/authControllers.js"
import isUserLoggedIn from '../utils/authentication.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', isUserLoggedIn, logout)
router.get('/login-status', getLoginStatus)

export default router
