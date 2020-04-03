var express = require('express');
var router = express.Router();
const Documentation = require('../models/documentation');
const passportMiddleware = require('../middlewares/passport');
var moment = require('moment');


/* GET users listing. */


module.exports.get = function(req, res, next) {
    Documentation.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Documentation get:", err)
            return res.status(500).json('Failed to get Documentation')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Documentation.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Documentation get:", err)
            return res.status(500).json('Failed to get Documentation')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Documentation.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Documentation.add(req.body, (err, data) => {
        if (err) {
            console.error("route Documentation post:", err)
            return res.status(500).json('Failed to register new Documentation')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Documentation.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Documentation put:", err)
            return res.status(500).json('Failed to update Documentation')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Documentation.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Documentation delete:", err)
            return res.status(500).json('Failed to delete Documentation')
        }
        res.status(204).json(data)
    });
}