var express = require('express');
var router = express.Router();
const PawnObjectPurity = require('../models/pawn-object-purity');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    PawnObjectPurity.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route PawnObjectPurity get:", err)
            return res.status(500).json('Failed to get PawnObjectPurity')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    PawnObjectPurity.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route PawnObjectPurity get:", err)
            return res.status(500).json('Failed to get PawnObjectPurity')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = PawnObjectPurity.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    PawnObjectPurity.add(req.body, (err, data) => {
        if (err) {
            console.error("route PawnObjectPurity post:", err)
            return res.status(500).json('Failed to register new PawnObjectPurity')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    PawnObjectPurity.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route PawnObjectPurity put:", err)
            return res.status(500).json('Failed to update PawnObjectPurity')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    PawnObjectPurity.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route PawnObjectPurity delete:", err)
            return res.status(500).json('Failed to delete PawnObjectPurity')
        }
        res.status(204).json(data)
    });
}