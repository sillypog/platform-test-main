/*
I am making the assumption that all uploaded images will be on Cloudinary,
as that is the case for all of the example data.
*/
const cloudinary = require('cloudinary').v2

// Configuration -
// These values should ideally be read from the environment.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || 'db19lwssv',
  api_key: process.env.CLOUDINARY_KEY || '215441947997926',
  api_secret: process.env.CLOUDINARY_SECRET || 'GioZVORSOSMBXZQ7vsm0CO3EpPc',
})

function addImageDimensions(productJSON) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.explicit(productJSON.picture.url, { type: 'fetch' }, function (error, result) {
      if (error && error.http_code === 404) {
        productJSON.error_type = 'Image Not Found'
      } else if (error && error.http_code === 401) {
        productJSON.error_type = 'Cloudinary Access Error'
      } else if (error) {
        productJSON.error_type = 'Cloudinary Error'
      } else {
        productJSON.picture.width = result.width
        productJSON.picture.height = result.height
      }
      resolve(productJSON)
    })
  })
}

export { addImageDimensions }
