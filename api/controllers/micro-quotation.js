var express = require("express");
var microQuotationRouter = express.Router();
// const mongoose = require('mongoose');
// const Quotation = require('../models/quotation');
const Solicitud = require("../models/solicitud-prestamo");
// const Valuation = require("../models/valuation");
const passportMiddleware = require("../middlewares/passport");
var moment = require("moment");
require("moment-range");
const mailCtrl = require('../controllers/mail/solicitud-micro');


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
    let solicitudQuery = {
        type: 'Micro-Prestamo',
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        bank: req.body.bank,
        phone: req.body.phone,
        clabe: req.body.clabe,
        paymentPlan: req.body.paymentPlan,
        loanRequested: req.body.loanRequested,
        social: req.body.social
    };
    // if (userAppointmentDate.getDay() == 6 || userAppointmentDate.getDay() == 7) {
    //     return res.status(500).json("Cita en dias no laborales");
    // } else {
    Solicitud.add(solicitudQuery, (err, dataSolicitud) => {
        if (err) {
            console.error("route Solicitud post:", err);
            return res.status(500).json("Failed to register new Solicitud");
        }
        let respuesta = {
            solicitud: dataSolicitud,
            template: 'micro-quotation'
        };
        console.log(respuesta)
        res.status(201).json(respuesta);
        mailCtrl(respuesta)
    });
    // }
};