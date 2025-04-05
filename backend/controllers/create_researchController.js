const Auth = require('../models/create_researchModel');

const auth = (req, res) => {
    const { title, author, published_date, file_url, image_url } = req.body;

    if (req.method === 'POST') {
        if (!title || !author || !published_date || !file_url || !image_url) {
            return res.status(400).json({ message: 'Title, author, published date, file and image url are required!' });
        }

        Auth.create({ title, author, published_date, file_url, image_url }, (err, results) => {
            if (err) {
                console.error('Error creating research:', err);
                return res.status(500).json({ message: 'Database error', error: err.message });
            }
            res.status(201).json({ message: 'Research created successfully', research: { id: results.insertId, title, author, published_date, file_url, image_url } });
        });
    } else {
        res.status(400).json({ message: 'Invalid request method' });
    }
};

const getAllResearch = (req, res) => {
    if (req.method === 'GET') {
        Auth.getAllResearch((err, results) => {
            if (err) {
                console.error('Error fetching research articles:', err);
                return res.status(500).json({ message: 'Database error', error: err.message });
            }
            res.status(200).json({ research: results });
        });
    } else {
        res.status(400).json({ message: 'Invalid request method' });
    }
};

module.exports = { auth, getAllResearch };
