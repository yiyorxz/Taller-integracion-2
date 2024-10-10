const {Pool} = require("pg")
const { database, password } = require("pg/lib/defaults")

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mondongo',
    password: 'javi200444',
    port: 5432,
});

module.exports = pool