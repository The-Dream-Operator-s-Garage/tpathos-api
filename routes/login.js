const { request, response } = require('express');
var express = require('express');
var router = express.Router();

var login_controller = require('../controllers/login.controller'); 

router.post('/', login_controller.LOGIN);

module.exports = router;
