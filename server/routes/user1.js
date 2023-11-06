const express=require('express')
const router=express()

const getController = require('../controllers/getController')
router.get('/',getController.getAll)

module.exports=router