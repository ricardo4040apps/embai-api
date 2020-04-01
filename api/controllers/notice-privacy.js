var express = require('express');
var router = express.Router();
const Notice = require('../models/notice-privacy');

/* GET AVISOS listing. */

module.exports.get = function(req, res, next) {
    Notice.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route notice of privacy get:", err)
            return res.status(500).json('Failed to get  notice of privacy')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Notice.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route  notice of privacy get:", err)
            return res.status(500).json('Failed to get  notice of privacy')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Notice.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Notice.add(req.body, (err, data) => {
        if (err) {
            console.error("route notice of privacy post:", err)
            return res.status(500).json('Failed to register new  notice of privacy')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Notice.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route notice of privacy put:", err)
            return res.status(500).json('Failed to update notice of privacy')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Notice.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route notice of privacy delete:", err)
            return res.status(500).json('Failed to delete notice of privacys')
        }
        res.status(204).json(data)
    });
}