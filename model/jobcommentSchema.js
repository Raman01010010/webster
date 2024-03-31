const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobcommentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  senderid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_w', // Reference to a User schema (if you have one)
    required: true,
  },
  receiverid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_w', // Reference to a User schema (if you have one)
    required: true,
  },
  jobid:{
    type:String,
    required:true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('JobComment', jobcommentSchema);
