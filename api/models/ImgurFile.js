import mongoose from 'mongoose'

const ImgurFile = new mongoose.Schema({
    fileDescription: {
        type: String,
        required: false,
    },
    url: {
        type: String,
        required: true,
    }
})

export default mongoose.model("Tag", Tag)
