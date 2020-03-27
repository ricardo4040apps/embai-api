var express = require('express');
var router = express.Router();
const Interests = require('../models/interests');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Interests.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Interests get:", err)
            return res.status(500).json('Failed to get Interests')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Interests.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Interests get:", err)
            return res.status(500).json('Failed to get comInterestspany')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Interests.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Interests.add(req.body, (err, data) => {
        if (err) {
            console.error("route Interests post:", err)
            return res.status(500).json('Failed to register new Interests')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Interests.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Interests put:", err)
            return res.status(500).json('Failed to update Interests')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Interests.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Interests delete:", err)
            return res.status(500).json('Failed to delete Interests')
        }
        res.status(204).json(data)
    });
}