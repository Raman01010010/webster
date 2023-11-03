const express=require('express')
const router=express()








const post=require('../model/postSchema')
const uploadController=require('../controllers/uploadController')
router.post('/', uploadController.upload.single('file'),async function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    const j=JSON.parse(req.body.json)
    console.log(j)
    const newPost=new post({
        email:"rmnprj@outlook.com",
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