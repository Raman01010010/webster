const express=require('express')
const router=express()





const cloudinary = require('cloudinary').v2;
const streamifier = require("streamifier"); // To create a readable stream from the buffer.

cloudinary.config({ 
  cloud_name: 'dd5kr52er', 
  api_key: '171698977888645', 
  api_secret: 'yo2WxHhN6n42DHpQgEZif9tK6R0' 
});


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage })


const post=require('../model/postSchema')
const uploadController=require('../controllers/uploadController')

router.post('/multiple', upload.array('files', 10), async (req, res) => {
    try {
        const uploadPromises = req.files.map((file) => {
          return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
              if (error) {
                console.error('Upload to Cloudinary failed:', error);
                reject(error);
              } else {
                console.log('File uploaded to Cloudinary:', result.secure_url);
                resolve(result.secure_url);
              }
            }).end(file.buffer);
          });
        });
      
        const uploadedUrls = await Promise.all(uploadPromises);
        const j=JSON.parse(req.body.json)
        console.log(j)
        const newPost=new post({
            email:j.email,
            head:j.head,
            content:j.content,
            time:Date.now(),
            //picture:req.filename,
            hashtag:j.hashtag,
            file:uploadedUrls
    
        })
    
    
    
        console.log(j.head)
        console.log(req.name)
        console.log("cnmnvmxcnv")
        console.log(JSON.stringify(req.file))
    
        try{
    await newPost.save()
        }catch(error){
            console.log(error)
        }
        res.json({ message: 'Files uploaded successfully', uploadedUrls });
      } catch (error) {
        console.error('An error occurred while uploading files:', error);
        res.status(500).json({ error: 'An error occurred while uploading files' });
      }
      
  });
router.post('/', uploadController.upload.single('file'),async function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    const j=JSON.parse(req.body.json)
    console.log(j)
    const newPost=new post({
        email:j.email,
        head:j.head,
        content:j.content,
        time:Date.now(),
        picture:req.filename,
        hashtag:j.hashtag

    })



    console.log(j.head)
    console.log(req.name)
    console.log("cnmnvmxcnv")
    console.log(JSON.stringify(req.file))

    try{
await newPost.save()
    }catch(error){
        console.log(error)
    }
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    return res.send(response)
  })






module.exports=router