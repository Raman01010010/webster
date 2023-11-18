const express=require('express')
const router=express()

const getController = require('../controllers/getController')
router.post('/',getController.getAll)

module.exports=router