const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://vivekchaudhary2092:vivek777@cluster0.67jcjlo.mongodb.net/', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Connected");
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB