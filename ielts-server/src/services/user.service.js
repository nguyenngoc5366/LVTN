// src/services/user.service.js
const db = require('../models/db.js');
const User = db.user;
const Role = db.role;

const createUser = async (userData) => {
    const { username, email, password, roles } = userData;

    // Tạo user mới
    const user = await User.create({
        username,
        email,
        password,
    });

    if (roles) {
        // Tìm roles từ bảng roles và gán cho user
        const assignedRoles = await Role.findAll({
            where: {
            name: roles,
            },
    });
    await user.setRoles(assignedRoles);
    } 
    else {
        // Nếu không có role truyền vào, gán mặc định là "user"
        const defaultRole = await Role.findOne({ where: { name: 'user' } });
        await user.setRoles([defaultRole]);
    }

    return user;
};

const getAllUsers = async () => {
  return await User.findAll({
    include: [Role], // Bao gồm luôn Role trong kết quả trả về
  });
};

const getUserById = async (id) => {
  return await User.findByPk(id, {
    include: [Role],
  });
};

const updateUser = async (id, userData) => {
  const { username, email, roles } = userData;

  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');

  user.username = username || user.username;
  user.email = email || user.email;

  if (roles) {
    const assignedRoles = await Role.findAll({
      where: {
        name: roles,
      },
    });
    await user.setRoles(assignedRoles);
  }

  await user.save();
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');

  await user.destroy();
  return { message: 'User deleted successfully' };
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
