const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');
const queryHelper = require('../helpers/query');

const Schema = mongoose.Schema

const mySchema = Schema({
    owner: { type: String },
    bussinesName: { type: String, required: true },
    companyCode: { type: String },
    taxAddress: { type: String }, 
    rfc: { type: String },
    societyType: { type: Boolean },
    incorporationDate: { type: Date }, 
    duration: { type: String },
        /// Capital social actual           ????
    description: { type: String },
    enabled: {type: Boolean},


    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    _deletedBy: Schema.Types.ObjectId,
})


mySchema.plugin(mongoosePaginate);

const CurrentModel = mongoose.model('Company', mySchema);


/*  - - - - - - - - - - - -     C R U D     - - - - - - - - - - - - */


module.exports.getAll = function(params, callback) {
    if (!params.page) {
        CurrentModel.find({}, callback);
    } else {
        this.getAllPagginated(params, callback);
    }
}



module.exports.getAllPagginated = function(params, callback) {
    const {page, limit, sort, q, ...filters} = params
    const options = {
        page: page || 1,
        limit: limit || 10,
        sort: sort,
    };

    let query = processQuery(filters, q)
    CurrentModel.paginate(query, options, callback);
}


module.exports.getById = function(id, callback) {
    CurrentModel.findById(id, callback);
}


module.exports.add = function(data, callback) {
    let newUser = new CurrentModel(data)
    newUser.save(callback)
}

module.exports.update = function(id, dataUser, callback) {
    let opt = { new: true }
    
    if (!dataUser.password) {
        CurrentModel.findOneAndUpdate(id , dataUser, opt, callback);
        return
    }

    CurrentModel.findOneAndUpdate(id , dataUser, opt, callback);

}

module.exports.absoluteDeleteById = function(id, callback) {
    CurrentModel.findByIdAndRemove(id, callback)
}


module.exports.deleteById = function(id, callback) {
    let query = { _id: id };
    let options = {};
    let data = { deleted: true };

    CurrentModel.update(query, data, options, callback);
}

/*  - - - - - - - - - - - -     E N D  C R U D     - - - - - - - - - - - - */




/*  - - - - - - - - - - - -     C U S T O M S     - - - - - - - - - - - - */


module.exports.hasErrors = function(data) {
    var user = new CurrentModel(data);
    return user.validateSync();
}

/*  - - - - - - - - - - - -     E N D  C U S T O M S     - - - - - - - - - - - - */




/*  - - - - - - - - - - - -     P R I V A T E     - - - - - - - - - - - - */

let processQuery = function(filters, strQ = '') {
    let exp = new RegExp(strQ.toLowerCase(), 'i');

    return { 
        $and:
        [ 
            filters,
            { $or:
                [
                    // strings
                    { owner: exp },
                    { bussinesName: exp },
                    { companyCode: exp },
                    { taxAddress: exp },
                    { rfc: exp },
                    { societyType: exp },
                    { incorporationDate: exp },
                    { duration: exp },
                    { description: exp },
                ]
            }
        ]
    }
}

/*  - - - - - - - - - - - -     E N D  P R I V A T E     - - - - - - - - - - - - */


var updateDate = function(next, done){
    this.update({},{ $set: { updatedAt: moment() } });
   next()
  };

mySchema.pre('save', updateDate)  // ??? it works
    .pre('update', updateDate)  // ??? it works
    .pre('findOneAndUpdate', updateDate)  // ok
    .pre('findByIdAndUpdate', updateDate) // ok
    .pre('aggregate', updateDate);  // ??? it works

// mySchema.post()


/*

pre('remove') or post('remove')
*/



// https://mongoosejs.com/docs/schematypes.html







