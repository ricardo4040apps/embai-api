var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const frecuencyCTRl = require('../controllers/frequency');
const frecuencyModel = require('../models/frequency');

/* GET users listing. */

module.exports.get = function(req, res, next) {
    let frecuenciaId = req.body.frecuenciaId;
    let monto = req.body.monto;
    console.log()
    let nMeses = req.body.nmeses;
    let tipo = req.body.tipo;
    let esquema = req.body.esquema;
    let final = monto;
    let periodos = [];
    var nPer = 0;
    let respuesta;
    var tasaInteresPeriodo = 0;

    frecuencyModel.getById(frecuenciaId, (err, data) => {
        if (err) {
            console.error("route id get:", err)
            return res.status(500).json('Failed to get id')
        }

        console.log("DATOS:: ", data)
        
        if (data.tag == 'weekly') {
            tasaInteresPeriodo = data.tasaInteres / 4; 
            nPer = nMeses * 4;
        } else if (data.tag == 'biweekly') {
            tasaInteresPeriodo = data.tasaInteres / 2;
            nPer = nMeses * 2;
        } else if (data.tag == 'monthly') {
            tasaInteresPeriodo = data.tasaInteres;
            nPer = nMeses;
        }

        let frecuencia = data.value;

        for (let i = 0; i < nPer; i++) {
            let inicial = final;
            let interes = (inicial * tasaInteresPeriodo) / 100;
            let divisor = ((monto) * (tasaInteresPeriodo / 100)).toFixed(2)
            let divPai = (1 + (tasaInteresPeriodo / 100))
            let elevar = Math.pow((divPai), (-nPer))
            let PAI = (divisor / (1 - elevar));
            let amorti = PAI - interes;
            let IVA = interes * 0.16;
            let pagIvaInc = PAI + IVA;
            final = inicial - amorti;

            periodos[i] = {
                "inicial": inicial,
                "interes": interes,
                "amort": amorti,
                "pagoAntIva": PAI,
                "IVA": IVA,
                "pagoIva": pagIvaInc,
                "final": final
            }

            respuesta = {
                id: frecuenciaId,
                tipo: tipo,
                monto: monto,
                frecuencia: frecuencia,
                esquema: esquema,
                nmeses: nMeses,
                nPeriodos: nPer,
                periodos: periodos
            }
        }

        if (!respuesta) {
            res.status(500).json("No se recibieron datos")
        } else {
            res.status(200).json(respuesta)
        }

    });


}