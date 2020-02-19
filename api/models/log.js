const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');
const queryHelper = require('../helpers/query');

const Schema = mongoose.Schema

const mySchema = Schema({
    modelName: { type: String },
    actionName: { type: String },
    data: { type: Object},
    
    _actionBy: Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
})


mySchema.plugin(mongoosePaginate);

const CurrentModel = mongoose.model('Log', mySchema);


/*  - - - - - - - - - - - -     C R U D     - - - - - - - - - - - - */


module.exports.getAll = function(callback) {
    CurrentModel.find({}, callback);
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
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback)
        })
    })
}


/*  - - - - - - - - - - - -     E N D  C R U D     - - - - - - - - - - - - */





/*  - - - - - - - - - - - -     P R I V A T E     - - - - - - - - - - - - */

processQuery = function(filters, strQ = '') {
    let exp = new RegExp(strQ.toLowerCase(), 'i');
    return { 
        $and:
        [ 
            filters,
            { $or:
                [
                    // strings
                    { modelName: exp },
                    { actionName: exp },
                ]
            }
        ]
    }
}


/*  - - - - - - - - - - - -     E N D  P R I V A T E     - - - - - - - - - - - - */










