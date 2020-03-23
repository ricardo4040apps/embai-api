var express = require('express');
var router = express.Router();
const ADS = require('../models/ads');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    ADS.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route ADS get:", err)
            return res.status(500).json('Failed to get ADS')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    ADS.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route ADS get:", err)
            return res.status(500).json('Failed to get ADS')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = ADS.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    ADS.add(req.body, (err, data) => {
        if (err) {
            console.error("route ADS post:", err)
            return res.status(500).json('Failed to register new ADS')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    ADS.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route ADS put:", err)
            return res.status(500).json('Failed to update ADS')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
        ADS.deleteById(req.params.id, (err, data) => {
            if (err) {
                console.error("route ADS delete:", err)
                return res.status(500).json('Failed to delete ADS')
            }
            res.status(204).json(data)
        });
    }
    // module.exports.isUsernameBussy = function(req, res, next) {
    //     let query =  {ads: req.params.value}
    //     User.getAll(query, (err, data) => {
    //       if (err) {
    //         console.error("route users get:", err)
    //         return res.status(500).json('Failed to get users')
    //       }
    //       res.status(200).json(data.length > 0)
    //     });
    //   }