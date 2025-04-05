const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/adminController');

const router = express.Router();

router.get('/admin/users/', getAllUsers);
router.get('/admin/users/:id', getUserById);
router.post('/admin/users/', createUser);
router.put('/admin/users/:id', updateUser);
router.delete('/admin/users/:id', deleteUser);

module.exports = router;
