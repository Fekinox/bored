import express from 'express'
import {
    getPosts,
    getPostById,
    createPost,
    deletePost,
    // addFileToPost,
    addTags,
    setMetadata,
    // removeFileFromPost,
    removeTags,
}from '../controllers/postControllers.js'

import upload from '../utils/multer.js'
import isUserLoggedIn from '../utils/authentication.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/:id(\d+)', getPostById)

router.post('/', isUserLoggedIn, upload.single('image'), createPost)
router.delete('/:id(\d+)', isUserLoggedIn, deletePost)

router.put('/:id(\d+)/tags', isUserLoggedIn, addTags)
router.delete('/:id(\d+)/tags', isUserLoggedIn, removeTags)
router.put('/:id(\d+)/metadata', isUserLoggedIn, setMetadata)

export default router
