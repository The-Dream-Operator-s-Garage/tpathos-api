const { request, response, Router } = require('express');
var express = require('express');
var router = express.Router();

var g_controller = require('../controllers/greeting.controller');

router.get('/greeting/', g_controller.GET);
router.get('/owner-types/', g_controller.GET_OWNER_TYPES);


module.exports = router;
