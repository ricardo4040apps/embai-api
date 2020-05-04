var express = require('express');
var router = express.Router();
const Solicitud = require('../models/solicitud-prestamo');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Solicitud.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Solicitud get:", err)
            return res.status(500).json('Failed to get Solicitud')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Solicitud.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Solicitud get:", err)
            return res.status(500).json('Failed to get Solicitud')
        }
        res.status(200).json(data)
    });
}

module.exports.getByIdUser = function(req, res, next) {
    req.query.user = req.params.id
    Solicitud.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Solicitud get:", err)
            return res.status(500).json('Failed to get  Solicitud')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Solicitud.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Solicitud.add(req.body, (err, data) => {
        if (err) {
            console.error("route Solicitud post:", err)
            return res.status(500).json('Failed to register new Solicitud')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Solicitud.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Solicitud put:", err)
            return res.status(500).json('Failed to update Solicitud')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Solicitud.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Solicitud delete:", err)
            return res.status(500).json('Failed to delete Solicitud')
        }
        res.status(204).json(data)
    });
}