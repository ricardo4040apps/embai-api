const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');
const queryHelper = require('../helpers/query');

const Schema = mongoose.Schema

const mySchema = Schema({
    facebook: { type: String },
    instagram: { type: String },
    correo: { type: String },
    telefono: { type: String },
    mision: { type: String },
    vision: { type: String },
    valores: { type: String },

    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    _deletedBy: Schema.Types.ObjectId
})

mySchema.plugin(mongoosePaginate);

const CurrentModel = mongoose.model("informacion-empresarial", mySchema);

/*  - - - - - - - - - - - -     C R U D     - - - - - - - - - - - - */

module.exports.get = function(callback) {
    CurrentModel.findOne({}, callback);
}


module.exports.update = function(data, callback) {
    let opt = { new: true, upsert: true }
    
    CurrentModel.findOneAndUpdate({} , data, opt, callback);
}

/*  - - - - - - - - - - - -     E N D  C R U D     - - - - - - - - - - - - */

/*  - - - - - - - - - - - -     C U S T O M S     - - - - - - - - - - - - */


/*  - - - - - - - - - - - -     E N D  C U S T O M S     - - - - - - - - - - - - */

/*  - - - - - - - - - - - -     P R I V A T E     - - - - - - - - - - - - */

let processQuery = function(filters, strQ = "") {
    let query = { $and: [filters] };

    if (!strQ) return query;
    let exp = new RegExp(strQ.toLowerCase(), "i");

    let searchQuery = {
        $or: [
            // informacion empresarial
            { facebook: exp },
            { instagram: exp },
            { correo: exp },
            { telefono: exp },
            { vision: exp },
            { mision: exp },
            { valores: exp }
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