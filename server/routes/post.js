const express=require('express')
const router=express()
const postController=require('../controllers/postController')
router.get('/',postController.getAll)
//router.post('/get',saveController.getAll)
module.exports=router