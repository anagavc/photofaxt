// requiring mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//requiring category
const Gallery = require('./gallery');

const CategorySchema = new Schema({
    catImage: {
        url: String,
        filename: String
    },
    title: String,
    description: String,
});



module.exports = mongoose.model('Category', CategorySchema);



