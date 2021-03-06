const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema


const mySchema = Schema({
    title: String,
    message: String,
    hyperlinkMessage: String,
    hyperlink: String,
    picture: String,
    type: String,     //labels??? class ???? icon???
    ref: String,        // only read field for users

    sendPush: Boolean,              /// programin verification??
    sendEmail: Boolean,              /// programin verification??
    scheduleDate: Date,
    deadLine: Date,


    deleted: { type: Boolean, default: false },
    _deletedBy: Schema.Types.ObjectId,
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
})


mongoose.set('useFindAndModify', false);
mySchema.plugin(mongoosePaginate);

const CurrentModel = mongoose.model('Notification', mySchema);


/*  - - - - - - - - - - - -     C R U D     - - - - - - - - - - - - */


module.exports.getAll = function(params, callback) {
    if (!params.page) {
        CurrentModel.find(params, callback);
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
    let newModel = new CurrentModel(data)
    newModel.save(callback)
}

module.exports.update = function(id, data, callback) {
    let opt = { new: true }
    CurrentModel.findOneAndUpdate({_id: id}, data, opt, callback);
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
    var newModel = new CurrentModel(data);
    return newModel.validateSync();
}

/*  - - - - - - - - - - - -     E N D  C U S T O M S     - - - - - - - - - - - - */




/*  - - - - - - - - - - - -     P R I V A T E     - - - - - - - - - - - - */

let processQuery = function(filters, strQ = '') {
    if (!strQ) return null;
    let exp = new RegExp(strQ.toLowerCase(), 'i');

    return { 
        $and:
        [ 
            filters,
            { $or:
                [
                    // strings
                    { title: exp },
                    { message: exp },
                    { hyperlinkMessage: exp },
                    { hyperlink: exp },
                    { picture: exp },
                    { type: exp },
                    { incorporationDate: exp },
                    { duration: exp },
                    { ref: exp },
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







