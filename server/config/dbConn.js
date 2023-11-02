const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://mern1:mernraman@cluster0.lykrowe.mongodb.net/mern1?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Connected");
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB