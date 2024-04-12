import express from 'express'
import {
    getAllUsers,
    getUserByUsername,
    getPostsByUser,
    getUserFavorites,
    addPostToFavorites,
    removePostFromFavorites,
    setUserDescription,
} from '../controllers/userInfoControllers.js'
import isUserLoggedIn from '../utils/authentication.js'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:username', getUserByUsername)

router.get('/:username/posts', getPostsByUser)

router.get('/:username/favorites', getUserFavorites)
router.post('/:username/favorites/:postId(\d)', isUserLoggedIn, addPostToFavorites)
router.delete('/:username/favorites/:postId(\d)', isUserLoggedIn, removePostFromFavorites)

router.put('/:username/description', setUserDescription)

export default router
