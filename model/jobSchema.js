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
    locationtypes:{
        type:String
    },
        applylink:{
            type:String
        },
        jobberid:{
            type:String
        },
         applicants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User' // Assuming you have a User model
        }
    ],
    },
     {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
    
// Create a virtual property 'isExpired' to check if the job has expired
jobSchema.virtual('isExpired').get(function () {
    const currentDate = new Date();
    return this.lastdate < currentDate;
});

module.exports = mongoose.model('job', jobSchema);