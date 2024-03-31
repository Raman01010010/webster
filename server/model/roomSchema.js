
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    room: {
        type:String,
        required:true
    },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user_w',
      required: true
    }
  ],
  active: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user_w',
      required: true
    }
  
  ],
  accepted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user_w',
      required: true
    }
  
  ]

});

module.exports = mongoose.model('room', roomSchema);


