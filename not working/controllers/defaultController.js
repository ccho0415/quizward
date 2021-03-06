var express = require('express');
var db = require("../models")
var bodyParser = require('body-parser');

// Create Router Object & middleware
var router = express.Router();
var jsonParse = bodyParser.urlencoded({ extended: false });
router.use(jsonParse);


// Routers
router.get('/', function(req, res) {
  db.Quiz.findAll({
    include
      model: db.User,
      through: db.UserQuiz,
    }, {
      model: db.Category,
      through: db.QuizCategory,
    }],
  }).then((results) => {
    var quizzes = {
      quizzes: results,
      user: req.user
    };
    res.render('home', quizzes);
  })
});

// TEMPLATING && SCAFFOLDING EXAMPLE FOR USING AUTHENTICATION!!
router.get('/test', function(req, res) {
  // CASE 1: no user signed in
  if (!req.user) {
    res.render('authEx/any_one');
  }
  // CASE 2: user signed in that is admin
  else if (req.user.isAdmin) {
    res.render('authEx/admin_access_only', { user: req.user });
  }
  // CASE 3: user signed in not admin
  else {
    res.render('authEx/any_logged_user', { user: req.user });
  }
});
module.exports = router;