
const express = require('express');
const profileController=require('../controllers/profileController')
const emailController=require('../controllers/emailController')

const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/create', jobController.create); // Use a different path for create
router.get('/showjob', jobController.showjob); // Use a different path for showjob
router.post('/myjob', jobController.myjob);
router.post('/profile',profileController.naukari)
router.post('/app',jobController.Application)
router.get('/getloc', jobController.location); // Use a different path for showjob
router.get('/getcompa', jobController.company); // Use a different path for showjob
router.get('/getskill', jobController.filterskill); // Use a different path for showjob

router.post('/showjob',jobController.showjob)
router.post('/jobapplication',jobController.myjobapplication)
router.post('/form',jobController.FormSubmitted)
router.post('/jobcomment',jobController.Jobcomment)
router.get('/jobcomment2/:senderid/:receiverid/:jobid',jobController.getJobComments)
router.post('/singlejob',jobController.Singlejob)

// router.post('/mail',emailController.sendEmail)
module.exports = router;


