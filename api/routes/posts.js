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
router.get('/:id', getPostById)

router.post('/', isUserLoggedIn, upload.single('image'), createPost)
router.delete('/:id', isUserLoggedIn, deletePost)

// router.post('/:id/addFile', 
//     isUserLoggedIn,
//     upload.single('image'),
//     addFileToPost)

router.put('/:id/tags', isUserLoggedIn, addTags)
router.delete('/:id/tags', isUserLoggedIn, removeTags)
router.put('/:id/metadata', isUserLoggedIn, setMetadata)
// router.delete('/:id/:fileId', isUserLoggedIn, removeFileFromPost)

export default router
