const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const createCloudinaryStorage = (defaultFolder = 'DefaultFolder') => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      const folderName = req.query.folder || defaultFolder
      console.log('Uploading to folder:', folderName)
      return {
        folder: folderName,
        allowed_formats: ['jpg', 'png', 'gif', 'jpeg', 'webp']
      }
    }
  })
}

const upload = (folderName) => {
  const storage = createCloudinaryStorage(folderName)
  return multer({ storage })
}

//!!!!! FIXEAR FORMDATA Y LA CREACIÓN DE CARPETAS EN CLOUDINARY

module.exports = upload
