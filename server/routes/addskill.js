const express=require('express')
const router=express()

const addSkillController = require('../controllers/addSkillController')
router.post('/',addSkillController.addingSkill)

module.exports=router