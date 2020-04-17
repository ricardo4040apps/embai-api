var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');



/* GET users listing. */

module.exports.get = function(req, res, next) {
    let plazo = req.body.plazo;
    let monto = req.body.monto;
    let nperiodos = req.body.nperiodos;
    let tipo = req.body.tipo;
    let final = monto;
    let periodos = new Array();

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
        let final = inicial - amorti;

        let respuesta = {
            plazo: plazo,
            monto: monto,
            nperiodos: nperiodos,
            tipo: tipo,
            periodos: [
                [i],
                {
                    "inicial": inicial,
                    "interes": interes,
                    "amort": amorti,
                    "pagoAntIva": PAI,
                    "IVA": IVA,
                    "pagoIva": pagIvaInc,
                    "final": final
                }
            ]

        }
        res.status(200).json(respuesta)
    }


}