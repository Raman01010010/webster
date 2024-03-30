const express=require("express");
const app=express();
const mongoose=require("mongoose");
const morgan=require("morgan");
const bodyParser = require('body-parser'); // Add this line
const {logger}=require('./middleware/logEvents')
const errorHandler=require('./middleware/errorHandler')


// Configure body-parser middleware
app.use(bodyParser.json({ limit: '5mb' }));
require("dotenv").config();
var cors=require('cors');
const cookieParser=require("cookie-parser")


//database connection 
const connectDB = require('./config/dbConn');
connectDB();



app.use(logger)

//MiddleWare
app.use(morgan('dev'));
app.use(bodyParser.json({limit:"5mb"}));
app.use(bodyParser.urlencoded(
    {limit:"5mb",
    extended:true
}));




app.use(cookieParser());
app.use(cors());

//port
const port=process.env.PORT ||9000
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})