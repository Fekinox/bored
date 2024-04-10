import "dotenv/config.js"
import axios from "axios"
import ImgurFile from "../models/ImgurFile.js"

const imgurAccountToken = process.env.IMGUR_ACCOUNT_TOKEN

export async function uploadImage(body, file, id) {
    const form = new FormData()
    form.append('image', new Blob([file.buffer]))
    form.append('type', 'image')
    form.append('title', `BoredApp Image ${id}`)
    form.append('description', `BoredApp Image ${id}`)

    console.log('Uploading to imgur...')
    const resp = await axios.postForm(
        'https://api.imgur.com/3/image/',
        form,
        {
            headers: {
                'Authorization': `Bearer ${imgurAccountToken}`,
            },
        }
    )

    console.log('Upload complete')
    const imageData = resp.data.data

    const theImage = new ImgurFile({
        description: "",
        url: imageData.link,
        imageId: id,
        imgurImageId: imageData.id,
        format: imageData.type,
    })

    return theImage
}

export async function deleteImage(imageHash) {
    const resp = await axios({
        method: 'delete',
        url: `https://api.imgur.com/3/image/${imageHash}`,
        headers: {
            'Authorization': `Bearer ${imgurAccountToken}`,
        },
    })
    return resp.success
}
