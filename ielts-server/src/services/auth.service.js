const db = require('../models/db.js');
const User = db.user;
const Role = db.role;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

// Đăng ký người dùng mới
exports.signup = async (username, email, password, role) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email already exists'); // Ném lỗi nếu email đã tồn tại
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if (role) {
        const roleData = await Role.findOne({ where: { name: role } });
        if (roleData) {
            await user.addRole(roleData);
        }
    }

    return user;
};

// Đăng nhập người dùng
exports.signin = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password.');
    }

    // Lấy các vai trò của người dùng
    const roles = await user.getRoles();
    const roleNames = roles.map(role => role.name);

    const token = jwt.sign({ id: user.id, roles: roleNames }, config.secret, {
        expiresIn: 86400 // 24 hours
    });

    return { auth: true, token };
};
