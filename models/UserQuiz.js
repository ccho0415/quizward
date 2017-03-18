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
            UserQuiz.hasOne(models.Quiz, {
              foreignKey: {
                allowNull: false
              }
            })
            UserQuiz.hasOne(models.User, {
              foreignKey: {
                allowNull: false
              }
            })
          }
        }
      }) // end of define
  return UserQuiz;
};