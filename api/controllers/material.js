var express = require('express');
var router = express.Router();
const Material = require('../models/material');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Material.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Material get:", err)
            return res.status(500).json('Failed to get Material')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Material.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Material get:", err)
            return res.status(500).json('Failed to get Material')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Material.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Material.add(req.body, (err, data) => {
        if (err) {
            console.error("route Material post:", err)
            return res.status(500).json('Failed to register new Material')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Material.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Material put:", err)
            return res.status(500).json('Failed to update Material')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Material.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Material delete:", err)
            return res.status(500).json('Failed to delete Material')
        }
        res.status(204).json(data)
    });
}