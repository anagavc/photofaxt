// requiring mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AboutSchema = new Schema({
    aboutUsImg: {
        url: String,
        filename: String
    },
    aboutus: String,
});


module.exports = mongoose.model('About', AboutSchema);
