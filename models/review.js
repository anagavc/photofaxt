// requiring mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReviewSchema = new Schema({
    revImage: {
        url: String,
        filename: String
    },
    name: String,
    rating: Number,
    comment: String,
});



module.exports = mongoose.model('Review', ReviewSchema);
