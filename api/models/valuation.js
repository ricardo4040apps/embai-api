const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');
const queryHelper = require('../helpers/query');

const Schema = mongoose.Schema

const mySchema = Schema({
    item: { type: String },
    // material: { type: String },
    // weight: { type: String },
    // value: { type: String },
    loanDate: { type: Date },
    requestedLoan: { type: String },
    recommendedLoan: { type: String },
    condition: { type: String },
    description: { type: String },
    valuatorComments: { type: String },
    actualValue: { type: String },
    solicitudId: { type: Schema.ObjectId, ref: "solicitud" },
    valuatorId: { type: Schema.ObjectId, ref: "User" },
    receptionDate: { type: Date },
    ticketNum: { type: String },
    ticket: { type: String },
    receiverId: { type: Schema.ObjectId, ref: "User" },
    status: { type: String, default: 'created' },

    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    _deletedBy: Schema.Types.ObjectId

})

mySchema.plugin(mongoosePaginate);

const CurrentModel = mongoose.model("valuation", mySchema);
module.exports = mongoose.model('valuation', mySchema)
    /*  - - - - - - - - - - - -     C R U D     - - - - - - - - - - - - */

module.exports.getAll = function(params, callback, absolute = false) {
    if (!absolute) params.deleted = false;
    if (!params.page) {
        CurrentModel.find(params, callback);
    } else {
        this.getAllPagginated(params, callback, absolute);
    }
};

module.exports.getAllPagginated = function(params, callback, absolute = false) {
    //if (!absolute) params.deleted = false;

    const { page, limit, sort, q, ...filters } = params;
    const options = {
        page: page || 1,
        limit: limit || 10,
        sort: sort
    };

    let query = processQuery(filters, q);

    CurrentModel.paginate(query, options, callback);
};

module.exports.getById = function(id, callback, absolute = false) {
    CurrentModel.findById(id, callback);
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
            // informacion 
            { item: exp },
            // { value: exp },
            // { loanDate: exp },
            { item: exp },
            // { material: exp },
            // { weight: exp },
            { recommendedLoan: exp },
            // { loanDate: exp },
            { condition: exp },
            { description: exp },

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