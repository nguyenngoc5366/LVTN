module.exports = (sequelize, Sequelize) => {
    const Quiz = sequelize.define("quizzes", {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return Quiz;
  };
  