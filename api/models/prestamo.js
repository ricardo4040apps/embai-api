const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema

const mySchema = Schema({
    user: { type: Schema.ObjectId, ref: "User" },
    cutOffDate: { type: Date },
    value: { type: String },
    type: { type: String }, // Micro-Prestamo, Joyeria
    solicitudId: { type: Schema.ObjectId, ref: "solicitud" },
    valuationId: { type: Schema.ObjectId, ref: "Valuation" },
<<<<<<< HEAD
    esquema: { type: String }, // que es????
    paymentFrecuenty: { type: Schema.ObjectId, ref: "Frequency" },
    tazaInteres: Number,
    plazo: Number,
    status: { type: String, default: 'active' }, // active, delayed, paid, expired 
=======


    paymentPlan: { type: Schema.ObjectId, ref: "Tiempo" }, // FRECUENCIA DE PAGO
    // paymentFrecuenty: { type: Schema.ObjectId, ref: "Frequency" },
    tazaInteres: Number,
    plazo: Number,
    status: { type: String, default: 'active' }, // active, delayed, paid, expired 

>>>>>>> 54c571380d8adef0dfea835aa2715c07ede2b6b4

    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    _deletedBy: Schema.Types.ObjectId

})

mySchema.plugin(mongoosePaginate);

const CurrentModel = mongoose.model("Prestamo", mySchema);

/*  - - - - - - - - - - - -     C R U D     - - - - - - - - - - - - */

module.exports.getAll = function(params, callback, absolute = false) {

    if (!absolute) params.deleted = false;
    if (!params.page) {
        let populate = params.populate
        delete params.populate
        CurrentModel.find(params)
            .populate(populate)
            .exec(callback);
    } else {
        this.getAllPagginated(params, callback, absolute);
    }
};

module.exports.getAllPagginated = function(params, callback, absolute = false) {
    console.log("PARAMETROS", params)
    const { page, limit, sort, q, populate, ...filters } = params;
    const options = {
        page: page || 1,
        limit: limit || 10,
        sort: sort,
        populate
    };

    let query = processQuery(filters, q);


    CurrentModel.paginate(query, options, callback);
};

module.exports.getById = function(id, callback, populate = '', absolute = false) {
    CurrentModel.findById(id).populate(populate).exec(callback);
};



module.exports.add = function(data, callback) {
    let newUser = new CurrentModel(data);
    newUser.save(callback);
};

module.exports.update = function(id, dataUser, callback) {
    let opt = { new: true };

    if (!dataUser.password) {
        CurrentModel.findOneAndUpdate({ _id: id }, dataUser, opt, callback);
        return;
    }

    CurrentModel.findOneAndUpdate({ _id: id }, dataUser, opt, callback);
};

module.exports.absoluteDeleteById = function(id, callback) {
    CurrentModel.findByIdAndRemove(id, callback);
};

module.exports.deleteById = function(id, callback) {
    let query = { _id: id };
    let options = {};
    let data = { deleted: true };

    CurrentModel.update(query, data, options, callback);
};

/*  - - - - - - - - - - - -     E N D  C R U D     - - - - - - - - - - - - */

/*  - - - - - - - - - - - -     C U S T O M S     - - - - - - - - - - - - */

module.exports.hasErrors = function(data) {
    var user = new CurrentModel(data);
    return user.validateSync();
};

/*  - - - - - - - - - - - -     E N D  C U S T O M S     - - - - - - - - - - - - */

/*  - - - - - - - - - - - -     P R I V A T E     - - - - - - - - - - - - */

let processQuery = function(filters, strQ = "") {
    let query = { $and: [filters] };

    if (!strQ) return query;
    let exp = new RegExp(strQ.toLowerCase(), "i");

    let searchQuery = {
        $or: [
            // informacion prestamo joyeria
            { user: exp },
            { cutOffDate: exp },
            { esquema: exp },
            { value: exp },

        ]
    };
    query.$and.push(searchQuery);
    // console.log('query', require('util').inspect(query, {depth:null}))

    return query;
};



/*  - - - - - - - - - - - -     E N D  P R I V A T E     - - - - - - - - - - - - */

var updateDate = function(next, done) {
    this.update({}, { $set: { updatedAt: moment() } });
    next();
};

mySchema
    .pre("save", updateDate) // ??? it works
    .pre("update", updateDate) // ??? it works
    .pre("findOneAndUpdate", updateDate) // ok
    .pre("findByIdAndUpdate", updateDate) // ok
    .pre("aggregate", updateDate); // ??? it works

// mySchema.post()

/*
pre('remove') or post('remove')
*/

// https://mongoosejs.com/docs/schematypes.html