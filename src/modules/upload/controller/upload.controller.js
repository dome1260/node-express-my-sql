const { Storage  } = require('@google-cloud/storage')

const storage = new Storage({
  projectId: 'test-service-426002',
  keyFilename: './test-service.json'
})

const bucketName = 'test-service-files'
const bucket = storage.bucket(bucketName)

const uploadController = {
  uploadFile (req, res) {
    const file = req.file

    if (!file) {
      return res.status(400).send('No file to upload')
    }

    const fileName = Date.now()
    const blob = bucket.file(fileName)
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    })

    blobStream
      .on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`
        return res.status(200).json({
          message: 'done',
          data: {
            publicUrl,
            name: file.originalname
          }
        })
      })
      .on('error', (error) => {
        return res.status(500).send(error)
      })
      .end(file.buffer)
  }
}

module.exports = uploadController
