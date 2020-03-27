var express = require('express');
var router = express.Router();
const Weight = require('../models/weight');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Weight.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Weight get:", err)
            return res.status(500).json('Failed to get Weight')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Weight.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Weight get:", err)
            return res.status(500).json('Failed to get Weight')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Weight.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Weight.add(req.body, (err, data) => {
        if (err) {
            console.error("route Weight post:", err)
            return res.status(500).json('Failed to register new Weight')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Weight.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Weight put:", err)
            return res.status(500).json('Failed to update Weight')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Weight.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Weight delete:", err)
            return res.status(500).json('Failed to delete Weight')
        }
        res.status(204).json(data)
    });
}