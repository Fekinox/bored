import mongoose from 'mongoose'
import { deleteImage } from '../utils/imgur.js'

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
    format: {
        type: String,
        required: true,
    },
})

ImgurFile.pre('deleteOne', { document: true, query: false }, async function() {
    await deleteImage(this.imgurImageId)
})

export default mongoose.model("ImgurFile", ImgurFile)
