const { request, response, Router } = require('express');
var express = require('express');
var router = express.Router();

var g_controller = require('../controllers/greeting.controller');
var i_controller = require('../controllers/inception.controller');

router.get('/greeting/', g_controller.GET);
router.get('/owner-types/', g_controller.GET_OWNER_TYPES);

// Inception routes
router.post('/incept-pioneer', i_controller.INCEPT_PIONEER);
// router.post('/incept/entity', i_controller.INCEPT_ENTITY);

module.exports = router;
