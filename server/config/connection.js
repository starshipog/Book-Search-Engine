const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Books');
mongoose.connect('mongodb+srv://cmwUser:KeyMaster08@cluster0.bttprgi.mongodb.net/?retryWrites=true&w=majority')

module.exports = mongoose.connection;