const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const productRoute = require('./src/modules/product/product.route')
const authRoute = require('./src/modules/auth/auth.route')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/products', productRoute)
app.use('/auth', authRoute)

app.get('/', (req, res) => {
  res.send('Server is running ...')
})

const port = process.env.PORT || 3030

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
