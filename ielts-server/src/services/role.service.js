// src/services/role.service.js
const db = require('../models/db.js');
const Role = db.role;

const createRole = async (roleData) => {
  const role = await Role.create({
    name: roleData.name,
  });
  return role;
};

const getAllRoles = async () => {
  return await Role.findAll();
};

const getRoleById = async (id) => {
  return await Role.findByPk(id);
};

const updateRole = async (id, roleData) => {
  const role = await Role.findByPk(id);
  if (!role) throw new Error('Role not found');

  role.name = roleData.name || role.name;
  await role.save();
  return role;
};

const deleteRole = async (id) => {
  const role = await Role.findByPk(id);
  if (!role) throw new Error('Role not found');

  await role.destroy();
  return { message: 'Role deleted successfully' };
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
