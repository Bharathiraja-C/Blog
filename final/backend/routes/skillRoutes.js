const express = require('express');
const router = express.Router();
const CertificationController = require('../controllers/CertificationController');
const verifyToken = require('../utils/jwt');

router.get('/project-details/:userId',verifyToken, CertificationController.getProjectDetails);
router.get('/skill-details/:userId',verifyToken, CertificationController.getSkillDetails);
router.get('/certification-details/:userId', verifyToken,CertificationController.getCertificationDetails);
router.get('/allproject-details', verifyToken,CertificationController.getAllProjectDetails);
router.get('/allskill-details',verifyToken, CertificationController.getAllSkillDetails);
router.get('/allcertification-details',verifyToken, CertificationController.getAllCertificationDetails);

module.exports = router;