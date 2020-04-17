var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');



/* GET users listing. */

module.exports.get = function(req, res, next) {
    let plazo = req.params.plazo;
    let monto = req.params.monto;
    let nperiodos = req.params.nperiodos;
    let tipo = req.params.tipo;
    let final = monto;
    let periodos = new Array();
    let respuesta

    for (let i = 0; i < nperiodos; i++) {
        let inicial = final;
        let interes = (inicial * 4.25) / 100;
        let divisor = ((monto) * (4.25 / 100)).toFixed(2)
        let divPai = (1 + (4.25 / 100))
        let elevar = Math.pow((divPai), (-nperiodos))
        let PAI = (divisor / (1 - elevar));
        let amorti = PAI - interes;
        let IVA = interes * 0.16;
        let pagIvaInc = PAI + IVA;
        final = inicial - amorti;

        respuesta = {
            plazo: plazo,
            monto: monto,
            nperiodos: nperiodos,
            tipo: tipo,

            periodos: [{
                "inicial": inicial,
                "interes": interes,
                "amort": amorti,
                "pagoAntIva": PAI,
                "IVA": IVA,
                "pagoIva": pagIvaInc,
                "final": final
            }]


        }
    }
    if (!respuesta) {
        res.status(500).json("No se recibieron datos")
    } else {
        res.status(200).json(respuesta)
    }

}