import express from 'express'
import {
    getAllUsers,
    getUserByUsername,
    getUserFavorites,
    addPostToFavorites,
    removePostFromFavorites,
} from '../controllers/userInfoControllers.js'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:username', getUserByUsername)

router.get('/:username/favorites', getUserFavorites)
router.post('/:username/favorites', addPostToFavorites)
router.delete('/:username/favorites/:postId', removePostFromFavorites)

export default router
