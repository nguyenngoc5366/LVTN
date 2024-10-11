// D:\website\Backend\src\config\db.config.js
module.exports = {
    HOST: "localhost",        // Host của PostgreSQL
    USER: "postgres",    // Tên người dùng
    PASSWORD: "Postgres123",// Mật khẩu
    DB: "app",      // Tên cơ sở dữ liệu
    dialect: "postgres",      // Sử dụng PostgreSQL
    pool: {
      max: 5,                 // Số kết nối tối đa
      min: 0,                 // Số kết nối tối thiểu
      acquire: 30000,         // Thời gian chờ lấy kết nối
      idle: 10000             // Thời gian chờ nếu không có kết nối
    }
  };
  