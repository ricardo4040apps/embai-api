var express = require('express');
var presJoyRouter = express.Router();
const PresJoy = require('../models/prestamo-joyeria');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    PresJoy.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route prestamo joyeria get:", err)
            return res.status(500).json('Failed to get prestamo joyeria')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    PresJoy.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Prestamo joyeria get:", err)
            return res.status(500).json('Failed to get Prestamo joyeria')
        }
        res.status(200).json(data)
    });
}

module.exports.getByIdUser = function(req, res, next) {
    // let query={user: req.params.id}
    req.query.user = req.params.id
    PresJoy.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Prestamo joyeria get:", err)
            return res.status(500).json('Failed to get Prestamo joyeria')
        }
        res.status(200).json(data)
    });
}

module.exports.create = function(req, res, next) {
    let errors = PresJoy.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    PresJoy.add(req.body, (err, data) => {
        if (err) {
            console.error("route Prestamo joyeria post:", err)
            return res.status(500).json('Failed to register new Prestamo joyeria')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}

module.exports.update = function(req, res, next) {
    PresJoy.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Prestamo joyeria put:", err)
            return res.status(500).json('Failed to update Prestamo joyeria')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    PresJoy.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Prestamo joyeria delete:", err)
            return res.status(500).json('Failed to delete Prestamo joyeria')
        }
        res.status(204).json(data)
    });
}