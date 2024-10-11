const express = require('express');
const authController = require('../controllers/auth.controller.js');
const router = express.Router();

// Đường dẫn đăng ký
router.post('/sign-up', authController.signup);

// Đường dẫn đăng nhập
router.post('/sign-in', authController.signin);

module.exports = router;
