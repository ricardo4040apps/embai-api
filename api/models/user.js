const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');
const queryHelper = require('../helpers/query');

const Schema = mongoose.Schema

const mySchema = Schema({
    name: { type: String },
    lastName: { type: String },
    username: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    CURP: { type: String },
    RFC: { type: String },
    emailVerified: { type: Boolean, default: false },
    countryCode: { type: String },
    cellPhone: { type: String, unique: true },
    cellPhoneVerified: { type: Boolean, default: false },

    picture: String,

    birthDate: { type: Date },
    gender: { type: String },
    cityOfBirth: { type: String },
    stateOfBirth: { type: String },

    street: { type: String },
    number: { type: String },
    state: { type: String },
    colony: { type: String },
    postalCode: { type: String },
    yearsAtHome: { type: String },
    working: { type: String },
    sourceOfIncome: { type: String },
    companyName: { type: String },
    position: { type: String },
    monthlySalary: { type: String },
    familySalary: { type: String },
    numberOfDependents: { type: String },


    avisoPersonal: { type: String },

    roleId: { type: Schema.Types.ObjectId, ref: 'Role' },
    creditId: { type: String },


    status: { type: String, default: 'new' }, // new, inactive, active, locked, banned,
    deleted: { type: Boolean, default: false },
    _deletedBy: Schema.Types.ObjectId,


    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
})


mySchema.plugin(mongoosePaginate);

const CurrentModel = mongoose.model('User', mySchema);
module.exports = mongoose.model('User', mySchema);

/*  - - - - - - - - - - - -     C R U D     - - - - - - - - - - - - */


module.exports.getAll = function(params, callback) {
    if (!params.page) {
        CurrentModel.find(params, callback);
    } else {
        this.getAllPagginated(params, callback);
    }
}


module.exports.getAllPagginated = function(params, callback) {
        const { page, limit, sort, q, ...filters } = params
        const options = {
            page: page || 1,
            limit: limit || 10,
            sort: sort,
        };

        let query = processQuery(filters, q)
        CurrentModel.paginate(query, options, callback);
    }
    // http://localhost:3000/users?limit=5&page=1&sort=deleted -createdAt
    // http://localhost:3000/users?limit=5&page=1&sort=deleted -createdAt&deleted=false&name=jose11111&q=per
    // http://localhost:3000/users?limit=5&page=1&sort=deleted -createdAt&deleted=false&name=jose11111&q=tru



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

module.exports.update = function(id, dataUser, callback) {
    let opt = { new: true }

    if (!dataUser.password) {
        CurrentModel.findOneAndUpdate({ _id: id }, dataUser, opt, callback);
        return
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(dataUser.password, salt, (err, hash) => {
            if (err) throw err;
            dataUser.password = hash;
            CurrentModel.findOneAndUpdate({ _id: id }, dataUser, opt, callback);
        })
    })

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


module.exports.getByUsername = function(username, callback) {
    const query = { username: username }
    CurrentModel.findOne(query, callback);
}

module.exports.getByCellPhone = function(cellPhone, callback) {
    const query = { cellPhone: cellPhone }
    CurrentModel.findOne(query, callback);
}


module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch)
    })
}

/*  - - - - - - - - - - - -     E N D  C U S T O M S     - - - - - - - - - - - - */




/*  - - - - - - - - - - - -     P R I V A T E     - - - - - - - - - - - - */

let processQuery = function(filters, strQ = '') {
    let query = { $and: [filters] };

    if (!strQ) return query;
    let exp = new RegExp(strQ.toLowerCase(), "i");

    let searchQuery = {
        $or: [
            { name: exp },
            { lastName: exp },
            { username: exp },
            { email: exp },
            { cellPhone: exp },
            { gender: exp },
            { CURP: exp },
            { RFC: exp },
            { status: exp }
        ]
    };
    query.$and.push(searchQuery);
    // console.log('query', require('util').inspect(query, {depth:null}))

    return query;
}

//http://localhost:3000/users?limit=5&page=1&sort=deleted -createdAt&deleted=false&name=jose11111&q=tru


/*  - - - - - - - - - - - -     E N D  P R I V A T E     - - - - - - - - - - - - */


var updateDate = function(next, done) {
    this.update({}, { $set: { updatedAt: moment() } });
    next()
};

mySchema.pre('save', updateDate) // ??? it works
    .pre('update', updateDate) // ??? it works
    .pre('findOneAndUpdate', updateDate) // ok
    .pre('findByIdAndUpdate', updateDate) // ok
    .pre('aggregate', updateDate); // ??? it works

// mySchema.post()


/*

pre('remove') or post('remove')
*/



// https://mongoosejs.com/docs/schematypes.html