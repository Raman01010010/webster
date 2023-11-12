const express=require('express')
const router=express()

const endorseController = require('../controllers/endorseController')
router.post('/',endorseController.endorseSkill)

module.exports=router