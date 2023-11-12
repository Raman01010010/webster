const express=require('express')
const router=express()

const fetchingEndorseController = require('../controllers/fetchingEndorseController')
router.post('/',fetchingEndorseController.fetchEndorse)

module.exports=router