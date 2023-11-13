const express=require('express')
const router=express()

const getpostController = require('../controllers/getpostController')
router.post('/',getpostController.getpost)

module.exports=router