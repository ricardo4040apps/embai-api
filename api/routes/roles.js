var express = require("express");
var router = express.Router();
const Role = require("../models/role");
const passportMiddleware = require("../middlewares/passport");

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                C R U D
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

router.get("/", passportMiddleware, function(req, res, next) {
    Role.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route roles get:", err);
            return res.status(500).json("Failed to get role");
        }
        res.status(200).json(data);
    });
});

router.get("/:id", passportMiddleware, function(req, res, next) {
    Role.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route roles get:", err);
            return res.status(500).json("Failed to get role");
        }
        res.status(200).json(data);
    });
});

router.post("/", passportMiddleware, function(req, res, next) {
    let errors = Role.hasErrors(req.body);
    console.log(errors);
    if (errors) return res.status(400).json(errors.message);

    Role.add(req.body, (err, data) => {
        if (err) {
            console.error("route roles post:", err);
            return res.status(500).json("Failed to register new role");
        }
        res.status(201).json(data);
        //res.status(201).json('User registered')
    });
});

router.put("/:id", passportMiddleware, function(req, res, next) {
    Role.update(req.params.id, req.body, (err, resp) => {
        if (err) {
            console.error("route roles put:", err);
            return res.status(500).json("Failed to update role");
        }
        res.status(200).json(resp);
    });
});

router.delete("/:id", passportMiddleware, function(req, res, next) {
    Role.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route roles delete:", err);
            return res.status(500).json("Failed to delete role");
        }
        res.status(204).json(data);
    });
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                C U S T O M S
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

router.put("/:id/permissions", function(req, res, next) {
    console.log(req.body);
  let query = {
    permissions: req.body
  }
    Role.update(req.params.id, query, (err, resp) => {
        if (err) {
            console.error("route roles put:", err);
            return res.status(500).json("Failed to update role");
        }
        res.status(200).json(resp);
    });
});



module.exports = router;
