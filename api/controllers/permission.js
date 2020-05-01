var express = require('express');
var router = express.Router();
const Company = require('../models/permission');
const passportMiddleware = require('../middlewares/passport');


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                C R U D
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

module.exports.get = function(req, res, next) {
  
    Company.getAll(req.query, (err, data) => {
      if (err) {
        console.error("route permissions get:", err)
        return res.status(500).json('Failed to get permission')
      }
      res.status(200).json(data)
    });

}

module.exports.getById = function(req, res, next) {
  Company.getById(req.params.id, (err, data) => {
    if (err) {
      console.error("route permissions get:", err)
      return res.status(500).json('Failed to get permission')
    }
    res.status(200).json(data)
  });
}


module.exports.create = function(req, res, next) {
  let errors =  Company.hasErrors(req.body);
  console.log(errors)
  if (errors) return res.status(400).json(errors.message)

  Company.add(req.body, (err, data) => {
    if (err) {
      console.error("route permissions post:", err)
      return res.status(500).json('Failed to register new permission')
    }
    res.status(201).json(data)
    //res.status(201).json('User registered')
  });
}


module.exports.update = function(req, res, next) {
  Company.update(req.params.id, req.body, (err, user) => {
    if (err) {
      console.error("route permissions put:", err)
      return res.status(500).json('Failed to update permission')
    }
    res.status(200).json(user)
  });
}


module.exports.deleteById = function(req, res, next) {
  Company.deleteById(req.params.id, (err, data) => {
    if (err) {
      console.error("route permissions delete:", err)
      return res.status(500).json('Failed to delete permission')
    }
    console.log(123, data)
    if (data) {
      return res.status(204).json(data);   
    }
    res.status(404).json("Dosent exist!");
});



}




/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                C U S T O M S
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

