// requiring mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TitleSchema = new Schema({
    favicon: {
        url: String,
        filename: String
    },
    webtitle: String,
});


module.exports = mongoose.model('Title', TitleSchema);
