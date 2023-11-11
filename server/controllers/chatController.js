const chat = require('../model/chatSchema');

const get = async (req, res) => {
    try {
        const room = req.body.room;

        // Use the `await` keyword when calling `chat.find()` and pass a valid query object
        const result = await chat.find({ room: room });

        // Use `res.status()` to set the HTTP status code, and send the result as JSON
        res.status(200).json(result);
    } catch (error) {
        // Handle any errors that might occur
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {get};
