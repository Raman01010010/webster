const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    
    picture:{
        type:String,
        default:"xx",
        required:false
    },
    resume:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('profile', profileSchema);