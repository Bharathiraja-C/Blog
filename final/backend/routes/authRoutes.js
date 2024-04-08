// authRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const verifyToken = require('../utils/jwt');

router.post('/login', AuthController.login);

router.post('/create-user',verifyToken,UserController.createUser);

router.post('/update-password', UserController.updatePassword);

router.post('/users/forgotPassword',AuthController.forgotPassword);

router.post('/users/resetPassword',AuthController.verifyOTP);
module.exports = router;
