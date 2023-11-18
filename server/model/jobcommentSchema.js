const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobcommentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  senderid: {
    type: String,
    required: true,
  },
  receiverid: {
    type: String,
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
