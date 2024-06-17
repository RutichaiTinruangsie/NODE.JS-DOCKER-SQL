require("dotenv").config();
const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER, // เช่น 'localhost' หรือ IP address
  database: process.env.DATABASE,
  options: {
    encrypt: true, // สำหรับ Azure SQL Database
    trustServerCertificate: true, // สำหรับการเชื่อมต่อ local
  },
};

module.exports = {
  config,
};
