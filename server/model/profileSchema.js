const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    phone: {
        type: String,
        required: true
    },
    
    place:{
        type:String,
        required:true
    },
    resume:{
        type:String,
    },
    skill:[
      {
          type:String
      }
  ],
    additionalQuestions: [
        {
          type: String
        }
      ],
      location:{
        type:String
      },
      jobid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job'
      },
      userID:{
        type:String
      },
      accepted:{
        type:String,
        default:"Applied",
      }
});
module.exports = mongoose.model('profile', profileSchema);