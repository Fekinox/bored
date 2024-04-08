import mongoose from 'mongoose'

const TagMap = new mongoose.Schema({
    tagID: mongoose.Types.ObjectID,
    postID: mongoose.Types.ObjectID,
})

export default mongoose.model("TagMap", TagMap)
