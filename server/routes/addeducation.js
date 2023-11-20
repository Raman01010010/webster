const express=require('express')
const router=express()

const addeducationController = require('../controllers/addeducationController')
router.post('/',addeducationController.addeducation)

module.exports=router