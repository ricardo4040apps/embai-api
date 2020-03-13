var express = require('express');
var microPresRouter = express.Router();
const MicroPrest = require('../models/micro-prestamo');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    MicroPrest.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Microprestamos get:", err)
            return res.status(500).json('Failed to get Microprestamos')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    MicroPrest.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Microprestamos get:", err)
            return res.status(500).json('Failed to get Microprestamos')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = MicroPrest.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    MicroPrest.add(req.body, (err, data) => {
        if (err) {
            console.error("route Microprestamos post:", err)
            return res.status(500).json('Failed to register new Microprestamos')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    MicroPrest.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Microprestamos put:", err)
            return res.status(500).json('Failed to update Microprestamos')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    MicroPrest.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Microprestamos delete:", err)
            return res.status(500).json('Failed to delete Microprestamos')
        }
        res.status(204).json(data)
    });
}