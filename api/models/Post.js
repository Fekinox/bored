import mongoose from 'mongoose'

const postsPerPage = 10

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
    file: {
        type: mongoose.ObjectId,
        ref: 'ImgurFile',
    },
    tags: [
        {
            type: mongoose.ObjectId,
            ref: 'Tag',
        },
    ]
},
{
    statics: {
        paginate(tagQuery, pageIndex) {
            return this
                    .find(tagQuery)
                    .sort('-uploadDate')
                    .skip((pageIndex - 1) * postsPerPage)
                    .limit(postsPerPage)
                    .populate('file')
                    .populate('tags')
                    
        }
    },
})


export default mongoose.model("Post", Post)
