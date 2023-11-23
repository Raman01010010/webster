const chatSchema = require('../model/chatSchema');
const chat = require('../model/chatSchema');
const User = require('../model/User.js');




const notifController = require('../controllers/notifController')
const call = async (req, res) => {
    console.log(req.body)
    const { userid,callid,myid } = req.body;
    const r5 = await notifController.sendNotification(userid, `Someone is calling you`
    , `/videoc/${myid}`, callid, res)
};





module.exports = {call};
