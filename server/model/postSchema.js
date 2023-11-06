const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    head: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    picture:{
        type:String,
        default:"xx",
        required:false
    },
    time:{
        type:String,
        required:true
    },
   
    hashtag:{
        type:Array
    },

    reaction: {
        like: [
          {
            type: String, // You can change the data type as needed
          },
        ],
        laugh: [
          {
            type: String, // You can change the data type as needed
          },
        ],
        insight: [
          {
            type: String, // You can change the data type as needed
          },
        ],
      },
      comm:{
        type:Number,
        default:0
      },
      react:[{emoji:String,by:String}],
    comments:[{content:String,time:String,user:String}],
   
});

module.exports = mongoose.model('post', postSchema);