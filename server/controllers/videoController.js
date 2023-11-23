const chatSchema = require('../model/chatSchema');
const chat = require('../model/chatSchema');
const User = require('../model/User.js');




const notifController = require('../controllers/notifController')
const call = async (req, res) => {
    try {
        const { userid, callid, myid } = req.body;

        if (!userid || !callid || !myid) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }
        const res=await User.findOne({_id:userid})

        // Handle different cases based o
            // Case 1
            await notifController.sendNotification(userid, `${res?.username} is calling you`, `/videoc/${myid}/${callid}`,'call', res);
            // Additional logic specific to Case 1
        
        // You can add more conditions here if needed, but there won't be an "else if" structure

        // Respond to the client or perform additional logic as needed
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error handling call:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example: Call the function






module.exports = {call};
