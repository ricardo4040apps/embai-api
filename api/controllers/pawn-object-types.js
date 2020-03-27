var express = require('express');
var router = express.Router();
const PawnObjectTypes = require('../models/pawn-object-type');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    PawnObjectTypes.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route PawnObjectTypes get:", err)
            return res.status(500).json('Failed to get PawnObjectTypes')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    PawnObjectTypes.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route PawnObjectTypes get:", err)
            return res.status(500).json('Failed to get PawnObjectTypes')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = PawnObjectTypes.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    PawnObjectTypes.add(req.body, (err, data) => {
        if (err) {
            console.error("route PawnObjectTypes post:", err)
            return res.status(500).json('Failed to register new PawnObjectTypes')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    PawnObjectTypes.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route PawnObjectTypes put:", err)
            return res.status(500).json('Failed to update PawnObjectTypes')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    PawnObjectTypes.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route PawnObjectTypes delete:", err)
            return res.status(500).json('Failed to delete PawnObjectTypes')
        }
        res.status(204).json(data)
    });
}