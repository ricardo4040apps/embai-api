var express = require('express');
var router = express.Router();
const Corporation = require('../models/corporation');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.getOwn = function (req, res, next) {
  Corporation.get((err, data) => {
    if (err) {
      console.error("route corporations get:", err)
      return res.status(500).json('Failed to get Corporation')
    }
    res.status(200).json(data)
  });
}


module.exports.updateOwn = function (req, res, next) {
  Corporation.update(req.body, (err, data) => {
    if (err) {
      console.error("route corporations put:", err)
      return res.status(500).json('Failed to update Corporation')
    }
    res.status(200).json(data)
  });
}
