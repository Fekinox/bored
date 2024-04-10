import mongoose from 'mongoose'

const Post = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    postId: {
        type: Number,
        required: true,
        index: true,
        unique: true,
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
        type: mongoose.ObjectId,
        ref: 'ImgurFile',
    }],
    tags: [
        {
            type: mongoose.ObjectId,
            ref: 'Tag',
        },
    ]
})


export default mongoose.model("Post", Post)
