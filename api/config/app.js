const database = require('./database');
const passport = require('./passport')

module.exports = {
    apiPort: 3000,


    // other configuration import
    database,
    passport
}