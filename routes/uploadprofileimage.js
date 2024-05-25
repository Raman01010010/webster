const express=require('express')
const router=express()

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Set your desired destination path
  },
  filename: function (req, file, cb) {
    cb(null, 'profileImage-' + Date.now())
  }
});

const upload = multer({ storage: storage });


const uploadPImageController = require('../controllers/uploadPImageController')
router.post('/',upload.single('profileImage'), uploadPImageController.uploadProfileImage)

module.exports=router