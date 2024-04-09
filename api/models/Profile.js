import mongoose from 'mongoose'

const Profile = new mongoose.Schema({
    description: {
        type: String,
        required: false,
    },
    favorites:[{
        type: mongoose.ObjectId,
        ref: 'Post',
    }],
})

export default mongoose.model("Profile", Profile)
