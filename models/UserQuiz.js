module.exports = function(sequelize, DataTypes) {
  var UserQuiz = sequelize.define('UserQuiz',
      // column names
      {
        score: {
          type: DataTypes.DECIMAL(5, 2),
        },
        userAnswers: {
          type: DataTypes.JSON,
        }
      },
      // options
      {
        underscored: true,
        freezeTableName: true,
        classMethods:  {
          associate: function(models) {
            UserQuiz.belongsTo(models.Quiz, {
              foreignKey: {
                'quiz_id'
              }
            })
            UserQuiz.belongsTo(models.User, {
              foreignKey: {
                'user_id'
              }
            })
          }
        }
      }) // end of define
  return UserQuiz;
};
