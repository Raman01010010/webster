const express=require('express')
const router=express()

const addprojectController = require('../controllers/addprojectController')
router.post('/',addprojectController.addproject)

module.exports=router