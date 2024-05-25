const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    senderEmail: {
        type: String,
        required: true
    },
    receiverEmail: {
        type: String,
        required: true
    },
    isConnected: {
        type: Boolean,
        default: false
    },
    connectionTime: {
        type: Date
    }
});

module.exports = mongoose.model('connection', connectionSchema);
