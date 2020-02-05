const Schema = require('mongoose').Schema;

console.error.prototype = () => {
    console.log('tu mama')
}

module.exports.processQ = function(mySchema, filters, strQ) {
    console.log(typeof(mySchema))
    if(Array.isArray(mySchema) ){
        // not implemented
        return filters;
    }

    // isMongooseSchemma ??!!
    let keys = Object.keys(mySchema.obj)
    // se podria usar para sacar el typo. type: [Function: Boolean]
    let or = [];
    keys.forEach(element => {
        let obj = {}
        obj[element] = strQ;
        or.push(obj)
    });
    let query = { $and:[ filters, { $or: or } ]}


    return query
}

