var express = require('express');
var bodyParser = require('body-parser');

// Get access to db
var Models = require('../models');

// Create Router Object & middleware
var router = express.Router();
var jsonParse = bodyParser.urlencoded({ extended: false });
router.use(jsonParse);


// API HOME  ----------------------------------- //
router.get('/', function(req, res) {
  res.render('api.handlebars');
})

// CATEGORY  ----------------------------------- //
/**
 * "/categories/:id?*" {GET} - returns all categories or given an id, returns that category specifically
 */
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
router.get('/users/:id?', function(req, res) {
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
})


// QUIZ ----------------------------------- //



module.exports = router;