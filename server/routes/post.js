const express=require('express')
const router=express()
const postController=require('../controllers/postController')
router.get('/all',postController.getAll)
router.post('/react',postController.react1)
//router.post('/get',saveController.getAll)
module.exports=router