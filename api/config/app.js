const database = require('./database');

let production = eval(process.env.PROD_ENV);

module.exports = {
    database: database,
}
