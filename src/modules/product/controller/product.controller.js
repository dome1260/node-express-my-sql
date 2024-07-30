const db = require('../../../config/db')
const statusEnum = require('../../../common/enum/status.enum')
const XLSX = require('xlsx')

const productController = {

  getProducts (req, res) {
    const { search } = req.query

    const query =  'SELECT * FROM `products` WHERE name LIKE ? AND `product_status` = ?'

    const values = [
      search ? `%${search}%` : '%',
      statusEnum.active
    ]

    db.execute(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: err?.message,
          data: null
        })
      }
      return res.status(200).json({
        message: 'done',
        data: results
      })
    })
  },

  getProductById (req, res) {
    const { id } = req.params

    const query = 'SELECT * FROM `products` WHERE id = ? AND `product_status` = ?'
    const values = [
      id,
      statusEnum.active
    ]

    db.execute(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: err?.message,
          data: null
        })
      }
      if (!results.length) {
        return res.status(404).json({
          message: 'not found',
          data: null
        })
      }
      return res.status(200).json({
        message: 'done',
        data: results[0]
      })
    })
  },

  createProduct (req, res) {
    const { name, price, description } = req.body

    const query = 'INSERT INTO `products` (`name`, `price`, `description`) VALUES (?, ?, ?)'

    const values = [
      name,
      Number(price),
      description
    ]

    console.log('values', values)

    db.execute(query, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err?.message,
          data: null
        })
      }
      return res.status(201).json({
        message: 'done',
        data: result
      })
    })
  },

  updateProduct (req, res) {
    const { id } = req.params
    const { name, price, description } = req.body

    const query = 'UPDATE `products` SET `name` = ?, `price` = ?, `description` = ? WHERE `id` = ?'

    const values = [
      name,
      Number(price),
      description,
      id
    ]

    db.execute(query, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err?.message,
          data: null
        })
      }
      // if (!result?.changedRows) {
      //   return res.status(404).json({
      //     message: 'not found',
      //     data: null
      //   })
      // }
      return res.status(200).json({
        message: 'done',
        data: result
      })
    })
  },

  deleteProduct (req, res) {
    const { id } = req.params

    const query = 'UPDATE `products` SET `product_status` = ? WHERE id = ?'

    const values = [statusEnum.deleted, id]

    db.execute(query, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err?.message,
          data: null
        })
      }
      return res.status(200).json({
        message: 'done',
        data: result
      })
    })
  },

  exportExcelData (req, res) {
    const query = 'SELECT * FROM `products`'

    db.execute(query, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: err?.message,
          data: null
        })
      }

      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(results)

      const headers = [['ID', 'ชื่อ', 'ราคา', 'รายละเอียด', 'สถานะ']]
      XLSX.utils.sheet_add_aoa(worksheet, headers)

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1', true)

      const bufferFile = XLSX.write(workbook, {
        type: 'buffer'
      })

      const fileName = `test-excel${new Date().valueOf()}.xlsx`

      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      res.header('Content-Disposition', `attachment; filename=${fileName}`)

      return res.send(bufferFile)
    })
  }
}

module.exports = productController
