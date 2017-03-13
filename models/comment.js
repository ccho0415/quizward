module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  },
  {
    // don't use camelcase for automatically added attributes but underscore style
    underscored: true,
    // disable the modification of table names
    freezeTableName: true,
    // classMethods: {
    //   associate: function(models) {
    //     Comment.belongsTo(models.UserQuiz, { foreignKey: models.UserQuiz.id });
    //   }
    // }
  }); // closes .define
  return Comment;
};