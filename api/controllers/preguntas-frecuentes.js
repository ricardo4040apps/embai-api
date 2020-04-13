var express = require('express');
var router = express.Router();
const Preguntas = require('../models/preguntas-frecuentes');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Preguntas.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Preguntas get:", err)
            return res.status(500).json('Failed to get Preguntas')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Preguntas.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Preguntas get:", err)
            return res.status(500).json('Failed to get Preguntas')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Preguntas.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Preguntas.add(req.body, (err, data) => {
        if (err) {
            console.error("route Preguntas post:", err)
            return res.status(500).json('Failed to register new Preguntas')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Preguntas.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Preguntas put:", err)
            return res.status(500).json('Failed to update Preguntas')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Preguntas.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Preguntas delete:", err)
            return res.status(500).json('Failed to delete Preguntas')
        }
        res.status(204).json(data)
    });
}
