var express = require("express");
var quotationRouter = express.Router();
// const mongoose = require('mongoose');
// const Quotation = require('../models/quotation');
const Solicitud = require("../models/solicitud-prestamo");
const Valuation = require("../models/valuation");
const passportMiddleware = require("../middlewares/passport");
var moment = require("moment");
require("moment-range");

module.exports.create = function(req, res, next) {
    // let errors = Quotation.hasErrors(req.body);
    // console.log(errors)
    // if (errors) return res.status(400).json(errors.message)
    let userAppointmentDate = new Date(req.body.appointmentDate);

    let valuationQuery = {
        item: req.body.item,
        material: req.body.material,
        weight: req.body.weight,
        value: req.body.value,
        loanDate: req.body.loanDate,
        recommendedLoan: req.body.recommendedLoan,
        condition: req.body.condition,
        description: req.body.description,
    };
    let solicitudQuery = {
        type: req.body.type,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        card: req.body.card,
        appointmentDate: req.body.appointmentDate,
        bank: req.body.bank,
        refExt: req.body.refExt,
        clabe: req.body.clabe,
        authorization: req.body.authorization,
    };
    console.log(userAppointmentDate.getDay());

    //comparar aqui
    if (userAppointmentDate.getDay() == 6 || userAppointmentDate.getDay() == 7) {
        return res.status(500).json("Citas en dias no laborales");
    } else {
        Valuation.add(valuationQuery, (err, dataValuation) => {
            if (err) {
                console.error("route Solicitud post:", err);
                return res.status(500).json("Failed to register new Solicitud");
            }
            console.log(1, dataValuation);
            solicitudQuery.valuationId = dataValuation._id;
            Solicitud.add(solicitudQuery, (err, dataSolicitud) => {
                if (err) {
                    console.error("route valuation post:", err);
                    return res.status(500).json("Failed to register new valuation");
                }

                let respuesta = {
                    solicitud: dataSolicitud,
                    valuation: dataValuation,
                };
                res.status(201).json(respuesta);
            });
        });
    }
};

module.exports.update = function(req, res, next) {
    const data = { valuationId: res };
    Solicitud.update(req.params.id, data, (err, data) => {
        if (err) {
            console.error("route Solicitud put:", err);
            return res.status(500).json("Failed to update Solicitud");
        }
        res.status(200).json(data);
    });
};
// var updateValuationIdIntoRequest = function (valuation=null,valuationId){
//     const data = {"valuationId":valuationId };
//     if (valuation){
//         Solicitud.update(valuation,data,(err,data)=>{
//             if(err){
//                 console.log("No se pudo actualizar el id de la Valuacion");
//                 return
//             }
//             console.log("Se actualizo el ID de Valuacion en Solicitud")
//         })
//     }
// }