const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: 'patwa123@$',
  database: 'product_management',
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = connection;
