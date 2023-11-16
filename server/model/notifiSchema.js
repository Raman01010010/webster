const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notifiSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_w', // Reference to a User schema (if you have one)
        required: true,
      },
    message: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
   
    },
    link: {
        type: String,
    },
    category:{
        type:String
    }
   
});

module.exports = mongoose.model('alert', notifiSchema);