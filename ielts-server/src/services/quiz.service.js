const db = require('../models/db.js');
const Quiz = db.quiz;

// Tạo quiz mới
exports.createQuiz = async (title, description, userId) => {
  if (!title) {
    throw new Error("Title is required!");
  }

  const quiz = await Quiz.create({
    title,
    description,
    createdBy: userId // Lưu ID người tạo quiz
  });

  return quiz;
};

// Lấy danh sách quiz
exports.getQuizzes = async () => {
  const quizzes = await Quiz.findAll();
  return quizzes;
};

// Bạn có thể thêm các chức năng khác như cập nhật và xóa quiz sau này
