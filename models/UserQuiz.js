module.exports = function(sequelize, DataTypes) {
  var UserQuiz = sequelize.define('UserQuiz',
      // column names
      {
        score: {
          type: DataTypes.DECIMAL(5, 2),
        },
      },
      // options
      {
        underscored: true,
        freezeTableName: true,
        // classMethods: {
        //   associate: function(models) {
        //     UserQuiz.hasMany(models.Comment);
        //   }
        // }
      }) // end of define
  return UserQuiz;
};

// module.exports = function(sequelize, DataTypes) {
//   var UserQuiz = sequelize.define('UserQuiz',
//       // column names
//       {
//         score: {
//           type: DataTypes.DECIMAL(5, 2),
//         }
//       },
//       // options
//       {
//         underscored: true,
//         freezeTableName: true,
//         classMethods: {
//           associate: function(models) {
//             UserQuiz.hasMany(models.Post, {
//               onDelete: 'CASCADE'
//             });
//           }
//         } // end classMethods
//       }) // end of define
//   return UserQuiz;
// };