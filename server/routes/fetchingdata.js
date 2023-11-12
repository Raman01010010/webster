const express=require('express')
const router=express()

const fetchingController = require('../controllers/fetchingController')
router.post('/',fetchingController.fetching)

module.exports=router