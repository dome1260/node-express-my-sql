const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const secretKey = process.env.JWT_SECRET_KEY || 'test1234@#'

const checkToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1] || null
  const decodeData = jwt.decode(token, secretKey)

  if (token && decodeData.exp <= (Date.now() / 1000)) {
    return res.status(401).json({
      message: 'token expired',
      data: null
    })
  }
  if (!token) {
    return res.status(401).json({
      message: 'token unauthorized',
      data: null
    })
  }
  next()
}

const createToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '7d' })
}

const decodeToken = (accessToken) => {
  return jwt.decode(accessToken, secretKey)
}

module.exports =  {
  createToken,
  checkToken,
  decodeToken
}
