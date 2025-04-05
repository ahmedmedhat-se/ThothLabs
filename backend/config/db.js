const mysql = require('mysql');
const config = require('./config');

const db = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ', err);
        process.exit(1);
    }
    console.log('Connected Successfully to the database');
});

module.exports = db;