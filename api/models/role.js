const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoosePaginate = require("mongoose-paginate-v2");

const PermissionModel = require("./permission").model;

const Schema = mongoose.Schema;

const mySchema = Schema({
    name: { type: String, required: true },
    tag: { type: String },

    enabled: { type: Boolean, default: true },

    permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],

    canDelete: { type: Boolean, default: true },
    
    deleted: { type: Boolean, default: false },
    _deletedBy: Schema.Types.ObjectId,
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

mySchema.plugin(mongoosePaginate);

const CurrentModel = mongoose.model("Role", mySchema);

module.exports.model = CurrentModel;

/*  - - - - - - - - - - - -     C R U D     - - - - - - - - - - - - */

module.exports.getAll = function(params, callback, absolute = false) {
    if (!absolute) params.deleted = false;

    if (!params.page) {
        CurrentModel.find(params, callback);
    } else {
        this.getAllPagginated(params, callback);
    }
};

module.exports.getAllPagginated = function(params, callback) {
    const { page, limit, sort, q, ...filters } = params;
    const options = {
        page: page || 1,
        limit: limit || 10,
        sort: sort
    };

    let query = processQuery(filters, q);
    CurrentModel.paginate(query, options, callback);
};

module.exports.getById = function(id, callback) {
    CurrentModel.findById(id, callback);
};

module.exports.add = function(data, callback) {
    let newModel = new CurrentModel(data);
    newModel.save(callback);
};

module.exports.update = function(id, data, callback) {
    let opt = { new: true };
    CurrentModel.findOneAndUpdate({ _id: id }, data, opt, callback);
};

module.exports.absoluteDeleteById = function(id, callback) {
    CurrentModel.findByIdAndRemove(id, callback);
};

module.exports.deleteById = function(id, callback) {
    let query = { _id: id, canDelete: true, deleted: false };
    let options = { upsert: false };
    let data = { deleted: true };

    CurrentModel.findOneAndUpdate(query, data, options, callback);
    //CurrentModel.update(query, data, options, callback);
};

/*  - - - - - - - - - - - -     E N D  C R U D     - - - - - - - - - - - - */

/*  - - - - - - - - - - - -     C U S T O M S     - - - - - - - - - - - - */

module.exports.hasErrors = function(data) {
    var newModel = new CurrentModel(data);
    return newModel.validateSync();
};

module.exports.getPermissions = function(id, callback) {
    // CurrentModel.findById(id, callback).populate('permissions.value');
    /*
    CurrentModel.findById(id).populate("permissions")
    .exec(function(err, doc {
        PermissionModel.populate(doc.stories, {path: 'creator'}, function (err, doc) {})
     })

      PermissionModel.
      findById(id, callback).
        populate({
          path: 'permissions',
          // Get friends of friends - populate the 'friends' array for every friend
          populate: { path: 'permissions' }
        });
     */

    CurrentModel.findById(id, callback).populate({
        path: "permissions",
        // Get friends of friends - populate the 'friends' array for every friend
        //populate: { path: "permissions" },
        //select: 'value'
    });
    //CurrentModel.find(params, callback);
};

//populate('author')

/*  - - - - - - - - - - - -     E N D  C U S T O M S     - - - - - - - - - - - - */

/*  - - - - - - - - - - - -     P R I V A T E     - - - - - - - - - - - - */

let processQuery = function(filters, strQ = "") {
    let query = { $and: [filters] };

    if (!strQ) return query;
    let exp = new RegExp(strQ.toLowerCase(), "i");

    let searchQuery = {
        $or: [
            // informacion prestamo joyeria
            { nale: exp }
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
