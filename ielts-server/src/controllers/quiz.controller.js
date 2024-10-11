const quizService = require('../services/quiz.service.js');

// Tạo quiz mới
exports.createQuiz = async (req, res) => {
  const { title, description } = req.body;

  try {
    const quiz = await quizService.createQuiz(title, description, req.userId);
    res.status(201).send({ message: "Quiz created successfully!", quiz });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Lấy danh sách quiz
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await quizService.getQuizzes();
    res.status(200).send(quizzes);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
