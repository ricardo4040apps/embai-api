const Prestamo = require('../models/prestamo');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Prestamo.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route prestamo get:", err)
            return res.status(500).json('Failed to get prestamo')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Prestamo.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Prestamo get:", err)
            return res.status(500).json('Failed to get Prestamo')
        }
        res.status(200).json(data)
    });
}

module.exports.getByIdUser = function(req, res, next) {
    // let query={user: req.params.id}
    req.query.user = req.params.id
    Prestamo.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Prestamo get:", err)
            return res.status(500).json('Failed to get Prestamo')
        }
        res.status(200).json(data)
    });
}

module.exports.create = function(req, res, next) {
    let errors = Prestamo.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Prestamo.add(req.body, (err, data) => {
        if (err) {
            console.error("route Prestamo post:", err)
            return res.status(500).json('Failed to register new Prestamo')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}

module.exports.update = function(req, res, next) {
    Prestamo.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Prestamo put:", err)
            return res.status(500).json('Failed to update Prestamo')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Prestamo.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Prestamo delete:", err)
            return res.status(500).json('Failed to delete Prestamo')
        }
        res.status(204).json(data)
    });
}