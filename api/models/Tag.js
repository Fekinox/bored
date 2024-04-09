import mongoose from 'mongoose'

const Tag = new mongoose.Schema({
    name: {
        type: "String",
        required: true,
        match: /[^A-Z\s]+/,
        index: true,
        unique: true,
    },
    namespace: {
        type: "String",
        required: false,
        match: /[a-z]+/
    },
})

export default mongoose.model("Tag", Tag)
