var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const config = require('../config/app');
const authCtrl = require('../controllers/auth');

/* GET users listing. */
router.post('/', function(req, res, next) {
    authCtrl.auth(req, res, next)
});


module.exports = router;
