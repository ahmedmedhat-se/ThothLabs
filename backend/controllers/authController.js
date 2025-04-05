const Auth = require('../models/authModel');
const bcrypt = require('bcrypt');

const auth = (req, res) => {
    const { action, name, email, phone, role, password } = req.body;

    if (req.method === 'POST') {
        if (action === 'register') {
            if (!name || !email || !password || !role) {
                return res.status(400).json({ message: 'Name, email, password, and role are required!' });
            }

            Auth.findByEmail({ email }, (err, existingUser) => {
                if (err) {
                    return res.status(500).json({ message: 'Database error', error: err });
                }

                if (existingUser.length > 0) {
                    return res.status(409).json({ message: 'Email already registered!' });
                }

                const hashedPassword = bcrypt.hashSync(password, 10);
                Auth.create({ name, email, phone, role, password: hashedPassword }, (err, results) => {
                    if (err) {
                        return res.status(500).json({ message: 'Database error', error: err });
                    }
                    res.status(201).json({ message: 'User registered successfully', user: { id: results.insertId, name, email, phone, role } });
                });
            });
        } else if (action === 'login') {
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required.' });
            }

            Auth.findByEmail({ email }, (err, user) => {
                if (err || !user || user.length === 0) {
                    return res.status(401).json({ message: 'Invalid email or password.' });
                }

                const isPasswordValid = bcrypt.compareSync(password, user[0].password_hash);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid email or password.' });
                }

                res.status(200).json({ message: 'Login successful', user: { id: user[0].user_id, name: user[0].name, email: user[0].email, phone: user[0].phone, role: user[0].role } });
            });
        } else {
            res.status(400).json({ message: 'Invalid action' });
        }
    } else {
        res.status(400).json({ message: 'Invalid request method' });
    }
};

module.exports = { auth };