import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })
console.log(upload)

export default upload
