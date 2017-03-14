var express = require('express');
var bodyParser = require('body-parser');

// Get access to db
var Models = require('../models');
var Sequelize = Models.Sequelize;

// Create Router Object & middleware
var router = express.Router();
var jsonParse = bodyParser.urlencoded({ extended: false });
router.use(jsonParse);


// API HOME  ----------------------------------- //
router.get('/', function(req, res) {
  res.render('api.handlebars');
})

// CATEGORY  ----------------------------------- //
// --------- Category GET ----------------------//
router.get('/categories/:id?', (req, res) => {
  // 1.) if there's a category id in query string get it
  category_id = parseInt(req.params.id);

  // 2) Query database
  if (category_id) {
    Models.Category.findOne(
      { where: { id: category_id} }
    ).then((result) => {
      res.json(result);
    })
  } else {
    Models.Category.findAll({}).then((results) => {
      res.json(results);
    });
  }
});

// USER ----------------------------------- //
router.get('/users/:id?', (req, res) => {
  user_id = parseInt(req.params.id);

  if (user_id) {
    Models.User.findOne({
      where: { id: user_id }
    }).then((results) => {
      res.json(results);
    })
  } else {
    Models.User.findAll({
      attributes: { exclude: ['password_hash'] }
    }).then((results) => {
      res.json(results);
    })
  }
});

router.get('/users/:user_id/categories', (req, res) => {
  // get user_id;
  var user_id = parseInt(req.params.user_id);

  // make query
  // Models.sequelize.query('SELECT * FROM User;').then((results) => {
  //   res.json(results);
  // })
  Models.User.findOne({
    include: [{ 
      model: Models.Category,
    }],
    where: { id: user_id }
  })
  .then((results) => {
    res.json(results);
  })
  //   where: { id: user_id },
  //   // include: [Models.UserCategory, Models.Category]
  //   // include: [{
  //   //   model: 'UserCategory',
  //   //   where: { user_id: Sequelize.col('User.id')}
  //   // }]


  // res.json({ user_id });
});


// QUIZ ----------------------------------- //
// --------- QUIZ GET ----------------------//
router.get('/quiz/:id?', (req, res) => {
  var quiz_id = parseInt(req.params.id);

  if (quiz_id) {
    Models.Quiz.findOne({
      where: { id: quiz_id }
    }).then((results) => {
      res.json(results);
    })
  } else {
    Models.Quiz.findAll({}).then((results) => {
      res.json(results);
    })
  }
});

// --------- QUIZ POST ----------------------//
// prev url: quizzes/create
// data: { name, category }
/** req.body
 *  name {string} - the name of the quiz
 * description {string} - description of the quiz
 * category {stringified array} - array of cateory -id
 */
router.post('/quiz/new', (req, res) => {

})



module.exports = router;