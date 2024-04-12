import express from 'express'

import postRouter from './posts.js'
import userInfoRouter from './userInfo.js'
import authRouter from './auth.js'

const router = express.Router()

router.use('/posts', postRouter)
router.use('/users', userInfoRouter)
router.use('/auth', authRouter)

export default router
