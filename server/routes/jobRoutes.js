


const express = require('express');
const profileController=require('../controllers/profileController')

const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/create', jobController.create); // Use a different path for create
router.get('/showjob', jobController.showjob); // Use a different path for showjob
router.post('/myjob', jobController.myjob);
router.post('/profile',profileController.naukari)
router.post('/app',jobController.Application)

module.exports = router;


router.post('/',profileController.naukari)