var express = require('express');
var router = express.Router();
const Plans = require('../models/plans');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Plans.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Plans get:", err)
            return res.status(500).json('Failed to get Plans')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Plans.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Plans get:", err)
            return res.status(500).json('Failed to get Plans')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Plans.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Plans.add(req.body, (err, data) => {
        if (err) {
            console.error("route Plans post:", err)
            return res.status(500).json('Failed to register new Plans')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Plans.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Plans put:", err)
            return res.status(500).json('Failed to update Plans')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Plans.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Plans delete:", err)
            return res.status(500).json('Failed to delete Plans')
        }
        res.status(204).json(data)
    });
}