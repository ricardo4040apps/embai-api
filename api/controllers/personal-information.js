var express = require('express');
var router = express.Router();
const Personal = require('../models/personal-information');
const passportMiddleware = require('../middlewares/passport');


/* GET PERSONAL INFORMATION listing. */

module.exports.get = function(req, res, next) {
    Personal.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route personal-information get:", err)
            return res.status(500).json('Failed to get personal-information')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Personal.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route personal-information get:", err)
            return res.status(500).json('Failed to get personal-information')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Personal.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Personal.add(req.body, (err, data) => {
        if (err) {
            console.error("route personal-information post:", err)
            return res.status(500).json('Failed to register new personal-information')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Personal.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route personal-information put:", err)
            return res.status(500).json('Failed to update personal-information')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Personal.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route personal-information delete:", err)
            return res.status(500).json('Failed to delete personal-information')
        }
        res.status(204).json(data)
    });
}