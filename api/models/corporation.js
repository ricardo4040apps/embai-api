const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema

const mySchema = Schema({
    aboutUs: { type: String },
    mission: { type: String },
    vision: { type: String },
    values: { type: String }, 
    
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
})


mongoose.set('useFindAndModify', false);
mySchema.plugin(mongoosePaginate);

const CurrentModel = mongoose.model('Corporation', mySchema);


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







