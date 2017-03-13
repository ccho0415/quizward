var express = require('express');
var bodyParser = require('body-parser');

// Create Router Object & middleware
var router = express.Router();
var jsonParse = bodyParser.urlencoded({ extended: false });
router.use(jsonParse);


// Routers
router.get('/', function(req, res) {
  res.json({ errors: false });
})

module.exports = router;