var express = require('express');
var router = express.Router();
const PawnObjects = require('../models/pawn-object');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    PawnObjects.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route PawnObjects get:", err)
            return res.status(500).json('Failed to get PawnObjects')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    PawnObjects.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route PawnObjects get:", err)
            return res.status(500).json('Failed to get PawnObjects')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = PawnObjects.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    PawnObjects.add(req.body, (err, data) => {
        if (err) {
            console.error("route PawnObjects post:", err)
            return res.status(500).json('Failed to register new PawnObjects')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    PawnObjects.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route PawnObjects put:", err)
            return res.status(500).json('Failed to update PawnObjects')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    PawnObjects.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route PawnObjects delete:", err)
            return res.status(500).json('Failed to delete PawnObjects')
        }
        res.status(204).json(data)
    });
}