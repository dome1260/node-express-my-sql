const mysql2 = require('mysql2')

module.exports = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mysql_server'
})

// module.exports = mysql2.createConnection({
//   host: 'monorail.proxy.rlwy.net',
//   user: 'root',
//   password: 'HfYEgctRhlSXyWyJQmGTUaIGnDkfujHp',
//   port: 45410,
//   database: 'railway'
// })
