// routes.js

const express = require('express');
const router = express.Router();
const CertificationController = require('../controllers/CertificationController');
const UserController = require('../controllers/UserController');
const verifyToken = require('../utils/jwt');

// Route for adding certifications
router.post('/add-certifications/:userId',verifyToken, CertificationController.addCertifications);
router.get('/users-details/:userId',verifyToken, UserController.getUserDetails);
router.post('/users/:userId/status',verifyToken,CertificationController.updateStatus);
router.post('/profile/:userId',verifyToken,UserController.getProfile);
router.post('/userprofiles',verifyToken,UserController.getUserProfiles);
router.post('/updateprofiles',verifyToken,UserController.UpdateProfiles);
router.post('/updateprofiles',verifyToken,UserController.UpdateProfiles);
router.post('/promoteuser',verifyToken,UserController.PromoteUser);
module.exports = router;
