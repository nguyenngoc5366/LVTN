// D:\website\Backend\src\models\db.js
const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,                 // Database name
  config.USER,               // Username
  config.PASSWORD,           // Password
  {
    host: config.HOST,       // Host của database
    dialect: config.dialect, // Loại database
    pool: {                  // Cấu hình pool kết nối
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

// Khởi tạo các giá trị cho Sequelize và sequelize
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import các model
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.quiz = require("./quiz.model.js")(sequelize, Sequelize);

// Thiết lập quan hệ nhiều-nhiều giữa user và role
db.role.belongsToMany(db.user, {
  through: "user_roles" // Bảng trung gian user_roles
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

// Định nghĩa các quyền trong hệ thống
db.ROLES = ["user", "admin"];

module.exports = db;
