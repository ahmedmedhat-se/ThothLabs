const db = require('../config/db');

const Auth = {
    create: (userData, callback) => {
        const { title, author, published_date, file_url, image_url } = userData;
        const query = 'INSERT INTO research (title, author, published_date, file_url, image_url) VALUES (?, ?, ?, ?,?)';
        db.query(query, [title, author, published_date, file_url, image_url], (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAllResearch: (callback) => {
        const query = 'SELECT * FROM research';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return callback(err);
            }
            callback(null, results); 
        });
    }
};

module.exports = Auth;
