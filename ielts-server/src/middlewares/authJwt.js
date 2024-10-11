const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models/db.js');

verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
        return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        req.roles = decoded.roles; // Lưu thông tin roles
        next();
    });
};

isAdmin = (req, res, next) => {
    if (req.roles.includes('admin')) {
        next();
    } else {
        res.status(403).send({ message: 'Require Admin Role!' });
    }
};

isUser = (req, res, next) => {
    if (req.roles.includes('user')) {
        next();
    } else {
        res.status(403).send({ message: 'Require User Role!' });
    }
};

module.exports = {
  verifyToken,
  isAdmin,
  isUser
};
