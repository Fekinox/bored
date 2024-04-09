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
    tags: [{
        tagId: {
            type: mongoose.ObjectId,
            ref: 'Tag',
        },
        name: {
            type: "String",
            required: true,
            match: /[^A-Z\s]+/,
        },
        namespace: {
            type: "String",
            required: false,
            match: /[a-z]+/
        },
    }]
})

export default mongoose.model("Post", Post)
