const express=require('express')
const router=express()

const deleteConnectionController = require('../controllers/deleteConnectionController')
router.post('/',deleteConnectionController.deleteConnection)

module.exports=router