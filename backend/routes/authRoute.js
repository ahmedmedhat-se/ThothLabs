const express = require('express');
const { auth } = require('../controllers/authController');

const router = express.Router();

router.post('/', auth);
router.get('/', auth);

module.exports = router;