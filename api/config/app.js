const databaseProd = require('./production/database');
const databaseTest = require('./tester/database');
///const passport = require('./passport');

let production = eval(process.env.PROD_ENV);

module.exports = {
    apiPort: 3000,

    // other configuration import
    database: production? databaseProd: databaseTest,
    ////passport                    //// this shouldn't be here
}
