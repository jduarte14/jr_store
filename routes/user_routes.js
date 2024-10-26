const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/user', UserController.getUsers);
router.get('/user/:id', UserController.getSingleUser);
router.post('/user', UserController.createUser);
router.put('/user/:id', UserController.editUser);
router.delete('/user/:id', UserController.deleteUser);
router .post ('/user/login', UserController.loginUser);

module.exports = router;