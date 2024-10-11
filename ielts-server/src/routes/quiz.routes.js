const express = require('express');
const quizController = require('../controllers/quiz.controller.js');
const { verifyToken, isAdmin } = require('../middlewares/authJwt.js');

const router = express.Router();

// Đường dẫn tạo quiz (chỉ dành cho admin)
router.post('/', [verifyToken, isAdmin], quizController.createQuiz);

// Đường dẫn lấy danh sách quiz (dành cho cả admin và user)
router.get('/', [verifyToken], quizController.getQuizzes);

module.exports = router;
