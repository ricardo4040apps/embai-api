var express = require('express');
var infoEmpRouter = express.Router();
const InfoEmp = require('../models/informacion-empresarial');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    InfoEmp.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route InfoEmp get:", err)
            return res.status(500).json('Failed to get InfoEmp')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    InfoEmp.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route InfoEmp get:", err)
            return res.status(500).json('Failed to get InfoEmp')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = InfoEmp.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    InfoEmp.add(req.body, (err, data) => {
        if (err) {
            console.error("route InfoEmp post:", err)
            return res.status(500).json('Failed to register new InfoEmp')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    InfoEmp.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route InfoEmp put:", err)
            return res.status(500).json('Failed to update InfoEmp')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    InfoEmp.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route InfoEmp delete:", err)
            return res.status(500).json('Failed to delete InfoEmp')
        }
        res.status(204).json(data)
    });
}