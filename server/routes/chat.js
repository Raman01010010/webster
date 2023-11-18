const express=require('express')
const router=express()

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage })

const chatController=require('../controllers/chatController')
const loginLimiter=require('../middleware/loginLimiter')
router.post("/img", upload.single("file"), chatController.up);
router.post("/last", chatController.getLast);  
router.post("/req", chatController.findReq); 
router.post("/create", chatController.createR); 
router.post("/main", chatController.findMain); 
router.post('/',chatController.get)

module.exports=router