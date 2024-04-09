import express from 'express'
import {
    getAllPosts,
    getPostById,
    createPost,
    deletePost,
    addFileToPost,
    addTags,
    setMetadata,
    removeFileFromPost,
    removeTags,
}from '../controllers/postControllers.js'

import upload from '../utils/multer.js'

const router = express.Router()

router.get('/', getAllPosts)
router.get('/:id', getPostById)
router.post('/', upload.single('image'), createPost)
router.delete('/:id', deletePost)

router.post('/:id/addFile', upload.single('image'), addFileToPost)
router.put('/:id/tags', addTags)
router.put('/:id/metadata', setMetadata),
router.delete('/:id/:fileId', removeFileFromPost)
router.delete('/:id/tags', removeTags)

export default router
