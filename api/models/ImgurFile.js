import mongoose from 'mongoose'

const ImgurFile = new mongoose.Schema({
    description: {
        type: String,
        required: false,
    },
    url: {
        type: String,
        required: true,
    },
    imageId: {
        type: Number,
        required: true,
    },
    imgurImageId: {
        type: String,
        required: true,
    },
    deleteHash: {
        type: String,
        required: true,
    },
    format: {
        type: String,
        required: true,
    },
})

export default mongoose.model("ImgurFile", ImgurFile)
