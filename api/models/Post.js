import mongoose from 'mongoose'

const Post = new mongoose.Schema({
    title: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now,
    },
    files: [{
        type: mongoose.Types.ObjectId,
    }]
})

export default mongoose.model("Tag", Tag)
