var express = require('express');
var infoEmpRouter = express.Router();
const InfoEmp = require('../models/informacion-empresarial');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */
module.exports.getOwn = function (req, res, next) {
    InfoEmp.get((err, data) => {
      if (err) {
        console.error("route information empresarial get:", err)
        return res.status(500).json('Failed to get information empresarial')
      }
      res.status(200).json(data)
    });
  }
  
  
  module.exports.updateOwn = function (req, res, next) {
    InfoEmp.update(req.body, (err, data) => {
      if (err) {
        console.error("route information empresarial put:", err)
        return res.status(500).json('Failed to update information empresarial')
      }
      res.status(200).json(data)
    });
  }
  