const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    titles: {
        type: String,
        //  required: true
    },
    company: {
        type: String,
        
    },
    locationonsite:{
        type:String,
       
    },
    skill:[
        {
            type:String
        }
    ],
    lastdate:{
        type: Date,
        // required: true,
    },
    jobtype:{
        type:String,
        // required:true
    },
   
    details:{
        type:String,
        // required:true
    },
    contact:[
       
            {
              type: String, // You can change the data type as needed
            
            }
    ],
        applylink:{
            type:String
        },
        jobberid:{
            type:String
        }
    
});

module.exports = mongoose.model('job', jobSchema);