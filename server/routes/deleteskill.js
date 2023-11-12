const express=require('express')
const router=express()

const deleteSkillController = require('../controllers/deleteSkillController')
router.post('/',deleteSkillController.deletingSkill)

module.exports=router