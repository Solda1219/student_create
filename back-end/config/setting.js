const mysql = require('mysql');
module.exports = {
  port: process.env.PORT || 3001,
  sqlDriver: mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student_create'
  }),
  jwt: {
    secret: process.env.JWT_SECRET || 'development_secret',
    expiry: '365d'
  },
};
