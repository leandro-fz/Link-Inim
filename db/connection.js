const mysql = require('mysql2/promise');

const createConnection = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'linkinim'
  });
}

let connection;
const getConnection = async () => {
  if(!connection) {
    connection = await createConnection();
  }

  return connection;
}

module.exports = {
  createConnection,
  getConnection
}