// src/routes/role.routes.js
const express = require('express');
const roleController = require('../controllers/role.controller');
const router = express.Router();

router.post('/', roleController.createRole);
router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;
