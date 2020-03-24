var express = require('express');
var router = express.Router();
const ADS = require('../models/ads');
const passportMiddleware = require('../middlewares/passport');
var moment = require('moment');


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

module.exports.isValidAds = function(req, res, next) {
    // let fechaInicial = { initDate: Date },
    //     fechaFinal = { finalDate: Date }
    // let fechaActual = new Date();
    // if (fechaActual => fechaInicial && fechaActual <= fechaFinal) {
    //     console.log("fecha Actual", fechaActual);
    //     console.log("Fecha inicial", fechaInicial);
    //     console.log("Fecha final", fechaFinal);
    console.log('controller ads')
        // let query = { valid: true }
    ADS.getAll(req.query, (err, data) => {
        let fechaActual = new Date();
        if (err) {
            console.error("route ADS get:", err)
            return res.status(500).json('Failed to get ADS')
        }
        for (let i in data) {
            // console.log("Imprimiendo inicio", data[i].initDate);
            // console.log("Imprimiendo final", data[i].finalDate);

            console.log("FECHA ACTUAL", fechaActual)

            if (moment().isBetween(moment(data[i].initDate), moment(data[i].finalDate))) {
                console.log('la fecha de hoy esta en el rango')
            } else {
                console.log('la fecha actual no esta en el rango')
            }
            // if (fechaActual => initDate && fechaActual <= finalDate) {
            //     console.log("DENTRO DEL RANGO")
            // } else {
            //     console.log("DESADENTRO DEL RANGO");
            // }
        }
        //  res.status(200).json(data)
    });
}