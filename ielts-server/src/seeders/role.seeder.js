// D:\website\Backend\src\seeders\role.seeder.js
const db = require("../models/db");

const seedRoles = async () => {
  try {
    const roles = ["user", "admin"];
    
    for (const roleName of roles) {
      const [role, created] = await db.role.findOrCreate({
        where: { name: roleName },
        defaults: { name: roleName }
      });
      
      if (created) {
        console.log(`Role '${roleName}' was created.`);
      } else {
        console.log(`Role '${roleName}' already exists.`);
      }
    }
  } catch (error) {
    console.error("Error seeding roles:", error);
  }
};

module.exports = seedRoles;
