const express = require('express')
const router = express.Router()

const productController = require('./controller/product.controller')

const { checkToken } = require('../../middlewares/auth-token')

// router.get('/', checkToken, productController.getProducts)
router.get('/', productController.getProducts)
router.post('/', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

router.get('/export-excel', productController.exportExcelData)

module.exports = router
