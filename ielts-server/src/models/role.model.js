// D:\website\Backend\src\models\role.model.js
module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Role;
  };
  