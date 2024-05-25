const express=require('express')
const router=express()
const uploadController=require('../controllers/uploadPController')

router.post('/uploadProfilePic',uploadController.uploadProfilePic);
module.exports=router