const express = require('express')
const router = express.Router()
const multer = require('multer')

const uploadController = require('./controller/upload.controller')

const upload = multer({
  storage: multer.memoryStorage()
})

router.post('/', upload.single('file'),  uploadController.uploadFile)

module.exports = router
