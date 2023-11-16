const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    room:{
        type:String,
        required:true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_w',
        required: true,
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_w',
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      other: {
        des: {
          type: String,
          
        },
        link: {
          type: String,
          
        }
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      seen:{
type:String
      },
      current:[String]
   
});

module.exports = mongoose.model('chat', chatSchema);