const db = require('../../../config/db')
const { createToken, decodeToken } = require('../../../middlewares/auth-token')

const authController = {

  login (req, res) {
    const { username, password } = req.body

    const query = 'SELECT * from `users` WHERE username = ? AND password = ?'
    const values = [username, password]

    db.execute(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: err?.message,
          data: null
        })
      }

      if (!results.length) {
        return res.status(404).json({
          message: 'username or password invalid',
          data: null
        })
      } else {
        const accessToken = createToken({
          id: results[0].id,
          username: results[0].username,
          firstName: results[0].first_name,
          lastName: results[0].last_name
        })
        const decodedData = decodeToken(accessToken)

        return res.status(200).json({
          message: 'done',
          data: {
            user: {
              id: results[0].id,
              username: results[0].username,
              firstName: results[0].first_name,
              lastName: results[0].last_name
            },
            accessToken,
            tokenExpire: decodedData.exp || ''
          }
        })
      }
    })
  }
}

module.exports = authController
