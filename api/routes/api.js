import express from 'express'

import postRouter from './posts.js'
import userInfoRouter from './userInfo.js'
import authRouter from './auth.js'
import fileRouter from './file.js'

const router = express.Router()

router.use('/posts', postRouter)
router.use('/users', userInfoRouter)
router.use('/auth', authRouter)
router.use('/file', fileRouter)

export default router
