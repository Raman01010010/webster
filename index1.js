const express=require('express')
const app=express()
const path=require('path')
const {logger}=require('./middleware/logEvents')
const errorHandler=require('./middleware/errorHandler')
const cors=require('cors')
const corsOption=require('./config/corsOptions')
//const verifyJWT=require('./middleware/verifyJWT')
//const cookieParser=require('cookie-parser')
//const credentials = require('./middleware/credential')
const PORT=process.env.PORT||3500
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
connectDB();
//app.use(cookieParser());
//Custom middleware logger

app.use(logger)
//cross origin resource sharing
app.use(credentials)
app.use(cors(corsOption))


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())

app.use('/',express.static(path.join(__dirname,'/public')))
app.use('/',require('./routes/root'))
app.use('/register',require('./routes/api/register'))
app.use('/auth',require('./routes/api/auth'))
app.use('/refresh',require('./routes/api/refresh'))
app.use('/logout',require('./routes/api/logout'))
app.use('/check',require('./routes/api/check'))


app.use('/compile',require('./routes/api/compile'))
app.use('/save',require('./routes/api/filesave'))
app.use('/upload',require('./routes/api/upload'))
app.use('/post',require('./routes/api/post'))
//app.use(express.static(__dirname + '/upload'));





app.use( express.static('uploads'));

app.use(verifyJWT)

app.use('/employees',require('./routes/api/employees'))
app.all('/*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.send('404 PAGE NOT FOUND')
    }
    else if(req.accepts('json')){
        res.json({error:'404 page not found'})
    }else{
        res.type('txt').send('404 page not found')
    }
   
})

app.use(errorHandler)
//Route Handlers
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
