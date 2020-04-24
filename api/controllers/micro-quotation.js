var express = require("express");
var microQuotationRouter = express.Router();
// const mongoose = require('mongoose');
// const Quotation = require('../models/quotation');
const Solicitud = require("../models/solicitud-prestamo");
const Banco = require("../models/bank");
const Frecuencia = require("../models/frequency");
// const Valuation = require("../models/valuation");
const passportMiddleware = require("../middlewares/passport");
var moment = require("moment");
require("moment-range");
const mailCtrl = require("../controllers/mail/solicitud-micro");

module.exports.create = function(req, res, next) {
    // let errors = Quotation.hasErrors(req.body);
    // console.log(errors)
    // if (errors) return res.status(400).json(errors.message)
    // let userAppointmentDate = new Date(req.body.appointmentDate);

    // let valuationQuery = {
    //     item: req.body.item,
    //     material: req.body.material,
    //     weight: req.body.weight,
    //     value: req.body.value,
    //     loanDate: req.body.loanDate,
    //     recommendedLoan: req.body.recommendedLoan,
    //     condition: req.body.condition,
    //     description: req.body.description,
    // };

    let datosFrecuencia;
    let datosBanco;

    Banco.getById(req.body.bank, (err, dataBank) => {
        if (err) {
            console.error("route Material get:", err);
            return res.status(500).json("Failed to get Material");
        }
        datosBanco = dataBank;
        Frecuencia.getById(req.body.paymentPlan, (err, dataFrequency) => {
            if (err) {
                console.error("route Material get:", err);
                return res.status(500).json("Failed to get Material");
            }
            datosFrecuencia = dataFrequency;
            let solicitudQuery = {
                type: "Micro-Prestamo",
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                bank: datosBanco.name, ////POR ID
                months: req.body.months,
                phone: req.body.phone,
                clabe: req.body.clabe,
                loanRequested: req.body.loanRequested,
                paymentPlan: datosFrecuencia.value, //// POR ID
            };
            if (!datosBanco) {
                res.status(500).json("No se llenaron los de Banco")
                return
            }
            if (!datosFrecuencia) {
                res.status(500).json("No se llenaron los de Frecuencia")
                return
            }
            if (!solicitudQuery) {
                res.status(500).json("No se llenaron todos los datos")
                return
            } else {
                Solicitud.add(solicitudQuery, (err, dataSolicitud) => {
                    if (err) {
                        console.error("route Solicitud post:", err);
                        return res.status(500).json("Failed to register new Solicitud");
                    }
                    let respuesta = {
                        solicitud: dataSolicitud,
                        template: "micro-quotation",
                    };
                    console.log(respuesta);
                    res.status(201).json(respuesta);
                    mailCtrl(respuesta);
                });
            }
        });
    });
};