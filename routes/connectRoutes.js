const express=require('express')
const router=express()
const connectController = require('../controllers/connectController');
const upload = require('./multer-setup'); // Adjust the path based on your project structure
const {imageController} = require('../controllers/imageController'); // Create this controller




router.post('/acceptrequest',connectController.acceptrequest)
router.post('/api/senddelete',connectController.deleteConnection)
router.post('/addeducation',connectController.addeducation)
router.post('/geteducation',connectController.getEducation)
router.post('/addproject',connectController.addproject)
router.post('/getproject',connectController.getproject)
router.post('/addskill',connectController.addingSkill)
router.post('/deleteskill',connectController.deletingSkill)
router.post('/endorseskill',connectController.endorseSkill)
router.post('/fetchendorse',connectController.fetchEndorse)
router.post('/fetchingdata',connectController.fetching)
router.post('/getpost',connectController.getpost)
router.post('/getparticularjob',connectController.particularjob)
router.post('/getpending',connectController.pending)
router.post('/api/sendconnect',connectController.connection)
router.post('/connections', connectController.myconnection);
router.post('/sendMessageRequest',connectController.sendMessagerequest)
router.post('/getuser',connectController.getAll)
router.post('/searchname',connectController.searchname)
router.post('/image', upload.single('file'), imageController.uploadImage);
router.post('/bell',connectController.alert)
router.post('/getalert',connectController.getalert);


module.exports=router