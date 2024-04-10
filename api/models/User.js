import mongoose from 'mongoose'

const User = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: mongoose.ObjectId,
        ref: 'Profile',
        required: true,
    },
})

export default mongoose.model("User", User)
