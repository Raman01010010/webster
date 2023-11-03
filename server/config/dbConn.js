const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://vivekchaudhary2092:vivek777@cluster0.lykrowe.mongodb.net/mern2?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Connected");
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB