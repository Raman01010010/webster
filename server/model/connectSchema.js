const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    senderEmail: {
        type: String,
        required: true,
        // unique: true, // Add unique constraint to senderEmail
    },
    receiverEmail: {
        type: String,
        required: true,
        // unique: true, // Add unique constraint to receiverEmail
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
