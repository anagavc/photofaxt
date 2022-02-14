// requiring mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FAQSchema = new Schema({
    question: String,
    answer: String,
});



module.exports = mongoose.model('FAQ', FAQSchema);
