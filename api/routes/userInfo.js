import express from 'express'
import {
    getAllUsers,
    getUserByUsername,
    getPostsByUser,
    getUserFavorites,
    addPostToFavorites,
    removePostFromFavorites,
} from '../controllers/userInfoControllers.js'
import isUserLoggedIn from '../utils/authentication.js'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:username', getUserByUsername)

router.get('/:username/posts', getPostsByUser)

router.get('/:username/favorites', getUserFavorites)
router.post('/:username/favorites/:postId', isUserLoggedIn, addPostToFavorites)
router.delete('/:username/favorites/:postId', isUserLoggedIn, removePostFromFavorites)

export default router
