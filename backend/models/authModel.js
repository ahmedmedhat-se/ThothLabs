const db = require('../config/db');

const Auth = {
    create: (userData, callback) => {
        const { name, email, phone, role, password } = userData;
        const query = 'INSERT INTO users (name, email, phone, role, password_hash) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [name, email, phone, role, password], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
    findByEmail: (userData, callback) => {
        const { email } = userData;
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Auth;