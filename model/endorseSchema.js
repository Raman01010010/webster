const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const endorseSchema = new Schema({
    
    EndorsingEmail:[String],

    EndorsedEmail: {
        type: String,
        required: true
    },

    EndorseSkill:{
       type:String,
       required: true
    },

    connectionTime: {
        type: Date
    }

});

module.exports = mongoose.model('endorse', endorseSchema);
