var express = require("express");
var quotationRouter = express.Router();
// const mongoose = require('mongoose');
// const Quotation = require('../models/quotation');
const Solicitud = require("../models/solicitud-prestamo");
const Valuation = require("../models/valuation");
const Material = require("../models/material");
const ObjType = require("../models/pawn-object-type");
const passportMiddleware = require("../middlewares/passport");
var moment = require("moment");
require("moment-range");
const mailCtrl = require("../controllers/mail/solicitud-joya");

module.exports.create = function(req, res, next) {
    // let errors = Quotation.hasErrors(req.body);
    // console.log(errors)
    // if (errors) return res.status(400).json(errors.message)
    let userAppointmentDate = new Date(req.body.appointmentDate);
    let tipoPrendaID = req.body.itemId;
    let tipoMateriallD = req.body.materialId;
    let datosTipoPrenda;
    let datosTipoMaterial;

    Material.getById(tipoMateriallD, (err, dataMaterial) => {
        if (err) {
            console.error("route Material get:", err);
            return res.status(500).json("Failed to get Material");
        }
        datosTipoMaterial = dataMaterial;
        ObjType.getById(tipoPrendaID, (err, dataObj) => {
            if (err) {
                console.error("route Obj get:", err);
                return res.status(500).json("Failed to get Obj");
            }
            datosTipoPrenda = dataObj;

            let valuationQuery = {
                item: datosTipoPrenda.name,
                material: datosTipoMaterial.name,
                requestedLoan: req.body.requestedLoan,
                // weight: req.body.weight,
                // value: req.body.value,
                // loanDate: req.body.loanDate,
                // recommendedLoan: req.body.recommendedLoan,
                // condition: req.body.condition,
                // description: req.body.description,
            };
            let solicitudQuery = {
                type: "Joyeria",
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                appointmentDate: req.body.appointmentDate,
                social: req.body.social,
                // card: req.body.card,
                // bank: req.body.bank,
                // refExt: req.body.refExt,
                // clabe: req.body.clabe,
                // authorization: req.body.authorization,
            };
            // console.log(userAppointmentDate.getDay());

            //comparar aqui
            if (
                userAppointmentDate.getDay() == 6 ||
                userAppointmentDate.getDay() == 7
            ) {
                return res.status(500).json("Cita en dias no laborales");
            } else {
                if (valuationQuery.value == null) {
                    return res.status(500).json("No llenaste los campos de Valuacion");
                } else {
                    if (solicitudQuery == null) {
                        return res.status(500).json("No llenaste los campos de Solicitud");
                    } else {
                        Valuation.add(valuationQuery, (err, dataValuation) => {
                            if (err) {
                                console.error("route Solicitud post:", err);
                                return res.status(500).json("Failed to register new Solicitud");
                            }
                            // console.log(1, dataValuation);
                            solicitudQuery.valuationId = dataValuation._id;
                            Solicitud.add(solicitudQuery, (err, dataSolicitud) => {
                                if (err) {
                                    console.error("route valuation post:", err);
                                    return res
                                        .status(500)
                                        .json("Failed to register new valuation");
                                }

                                let respuesta = {
                                    solicitud: dataSolicitud,
                                    valuation: dataValuation,
                                    template: "quotation",
                                };
                                console.log(respuesta);
                                res.status(201).json(respuesta);
                                mailCtrl(respuesta);
                            });
                        });
                    }
                }
            }
        });
    });
};