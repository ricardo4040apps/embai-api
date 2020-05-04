var express = require("express");
const Role = require("../models/role");
const passportMiddleware = require("../middlewares/passport");


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                C R U D
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

module.exports.get = function(req, res, next) {
    Role.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route roles get:", err);
            return res.status(500).json("Failed to get role");
        }
        res.status(200).json(data);
    });
}

module.exports.getById = function(req, res, next) {
    Role.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route roles get:", err);
            return res.status(500).json("Failed to get role");
        }
        res.status(200).json(data);
    });
}

module.exports.create = function(req, res, next) {
    let errors = Role.hasErrors(req.body);
    console.log(errors);
    //if (errors) return res.status(400).json(errors.message);

    Role.add(req.body, (err, data) => {
        if (err) {
            console.error("route roles post:", err);
            return res.status(500).json("Failed to register new role");
        }
        res.status(201).json(data);
        //res.status(201).json('User registered')
    });
}

module.exports.update = function(req, res, next) {
    Role.update(req.params.id, req.body, (err, resp) => {
        if (err) {
            console.error("route roles put:", err);
            return res.status(500).json("Failed to update role");
        }
        res.status(200).json(resp);
    });
}

module.exports.deleteById = function(req, res, next) {
    Role.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route roles delete:", err);
            return res.status(500).json("Failed to delete role");
        }
        if (data) {
            return res.status(204).json(data);   
        }

        res.status(404).json("Dosent exist!");
    });
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                C U S T O M S
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

module.exports.updatePermissions = function(req, res, next) {
    console.log(req.body);
    let query = {
        permissions: req.body
    };
    Role.update(req.params.id, query, (err, resp) => {
        if (err) {
            console.error("route roles put:", err);
            return res.status(500).json("Failed to update role");
        }
        res.status(200).json(resp);
    });
}

module.exports.getPermissions = function(req, res, next) {
    console.log(req.params.id)
    Role.getPermissions(req.params.id, (err, resp) => {
        if (err) {
            console.error("route roles permissions get:", err);
            return res.status(500).json("Failed to get role permissions");
        }
        res.status(200).json(resp);
    });
}

