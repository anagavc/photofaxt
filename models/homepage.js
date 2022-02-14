// requiring mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const homePageSchema = new Schema({
    herocaption: String,
    spantext: String,
    heroImage: {
        url: String,
        filename: String
    },
    fblink: String,
    twitterlink: String,
    instagramlink: String,
    copyright: String
});


module.exports = mongoose.model('Home', homePageSchema);
