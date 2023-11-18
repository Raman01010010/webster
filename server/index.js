const express=require('express')
const app=express()
const path=require('path')
const {logger}=require('./middleware/logEvents')
const errorHandler=require('./middleware/errorHandler')
const cors=require('cors')
const corsOption=require('./config/corsOptions')
const verifyJWT=require('./middleware/verifyJWT')
const cookieParser=require('cookie-parser')
const credentials = require('./middleware/credential')
const {initSocket}=require('./Socs')











const PORT=3500
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
connectDB();


app.use(logger)



app.use(cors(corsOption))

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use( express.static('uploads'));
app.use('/user',require('./routes/user'))
app.use('/auth',require('./routes/auth'))
app.use('/refresh',require('./routes/refresh'))
app.use('/upload',require('./routes/uploadPost'))

app.use('/job', require('./routes/jobRoutes'));

// app.use('/profile', require('./routes/profile'));

// app.use('/myjob',require('./routes/myjob'));

app.use('/user1',require('./routes/userUpdate'))
app.use('/getuser',require('./routes/user1'))
app.use('/api/sendconnect',require('./routes/connection'))
app.use('/getpending',require('./routes/pending'))
app.use('/acceptrequest',require('./routes/acceptrequest'))
app.use('/connections',require('./routes/connections'))
app.use('/api/sendMessageRequest',require('./routes/messageRequest'))
app.use('/api/senddelete',require('./routes/deleteConnection')) 
app.use('/chat',require('./routes/chat'))  

app.use('/fetchingdata',require('./routes/fetchingdata'))
app.use('/addskill',require('./routes/addskill'))
app.use('/deleteskill',require('./routes/deleteskill'))
app.use('/endorseskill',require('./routes/endorseSkills'))
app.use('/fetchendorse',require('./routes/fetchingEndorse'))
app.use('/getpost',require('./routes/getpost'))
app.use('/post',require('./routes/post'))
app.use('/getparticularjob',require('./routes/particularjob'))
app.use('/geteducation',require('./routes/geteducation'))
app.use('/addeducation',require('./routes/addeducation'))
app.use('/getproject',require('./routes/getproject'))
app.use('/addproject',require('./routes/addproject'))
app.use('/uploadprofileimage',require('./routes/uploadprofileimage'))
app.use(verifyJWT)




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
  const  server=app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    initSocket(server)
});



