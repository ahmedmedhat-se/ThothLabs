const express = require('express');
const { auth, getAllResearch } = require('../controllers/create_researchController');

const router = express.Router();

router.post('/', auth);
router.get('/', getAllResearch);

module.exports = router;