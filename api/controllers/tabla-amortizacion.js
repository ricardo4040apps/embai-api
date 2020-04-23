var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const frecuencyCTRl = require('../controllers/frequency');
const frecuencyModel = require('../models/frequency');

/* GET users listing. */

module.exports.get = function(req, res, next) {
    let frecuenciaId = req.body.frecuenciaId;
    let monto = req.body.monto;
    let nperiodos = req.body.nperiodos;
    let tipo = req.body.tipo;
    let esquema = req.body.esquema;
    let final = monto;
    let periodos = [];
    let respuesta;
    let tasaInteres;
    let datos;

    frecuencyModel.getById(frecuenciaId, (err, data) => {
        if (err) {
            console.error("route id get:", err)
            return res.status(500).json('Failed to get id')
        }
        datos = data;

        console.log("DATOS", datos)
        let frecuencia = datos.value;

        if (frecuencia == '') {
            tasaInteres = '4.25'
        }

        for (let i = 0; i < nperiodos; i++) {
            let inicial = final;
            let interes = (inicial * datos.tasaInteres) / 100;
            let divisor = ((monto) * (datos.tasaInteres / 100)).toFixed(2)
            let divPai = (1 + (datos.tasaInteres / 100))
            let elevar = Math.pow((divPai), (-nperiodos))
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
                nperiodos: nperiodos,
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