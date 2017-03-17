var express = require('express');
var db = require("../models");
var bodyParser = require('body-parser');

// Create Router Object & middleware
var router = express.Router();
var jsonParse = bodyParser.urlencoded({ extended: false });
router.use(jsonParse);

// Routers
router.get('/', function(req, res) {	
  db.Quiz.findAll({
    include: [{
      model: db.User,
      through: db.UserQuiz,
    }, {
      model: db.Category,
      through: db.QuizCategory,
    }],
    order: [
    ["name", "DESC"]
    ],
    limit: 6,
  }).then((results) => {
    var quizzes = {
      quizzes: results,
      user: req.user
    };
    // res.json(quizzes);
 	res.render("home", quizzes);
  }).then()

});

module.exports = router;