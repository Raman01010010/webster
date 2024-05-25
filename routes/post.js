const express=require('express')
const router=express()
const postController=require('../controllers/postController')
router.post('/all',postController.getAll)
router.post('/react',postController.react1)
router.post('/com',postController.com)
router.post('/get',postController.getCommentsForPost)
router.post('/getone', postController.getPostById);
router.post('/search', postController.getSearch);
//router.post('/get',saveController.getAll)
module.exports=router