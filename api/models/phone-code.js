const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoosePaginate = require("mongoose-paginate-v2");
const queryHelper = require("../helpers/query");

const Schema = mongoose.Schema;

const mySchema = Schema({

    code: { type: String },
    cellPhone: { type: String },
    id: { type: String },


    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    _deletedBy: Schema.Types.ObjectId
});

mySchema.plugin(mongoosePaginate);

const CurrentModel = mongoose.model('PhoneCode', mySchema);






module.exports.update = function(cellPhone, data, callback) {
    let opt = { upsert: true, new: true, returnOriginal: false  };

    CurrentModel.findOneAndUpdate({ cellPhone: cellPhone }, data, opt, callback);
};

module.exports.getOne = function(params, callback) {
    CurrentModel.findOne(params, callback);
};

