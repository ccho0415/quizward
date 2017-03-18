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
                name: 'quiz_id',
                allowNull: false
              }
            })
            UserQuiz.belongsTo(models.User, {
              foreignKey: {
                name: 'user_id',
                allowNull: false
              }
            })
          }
        }
      }) // end of define
  return UserQuiz;
};