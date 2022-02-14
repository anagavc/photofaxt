// requiring mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookingSchema = new Schema({
    name: String,
    phone: String,
    date: String,
    desc: String,
});



module.exports = mongoose.model('Booking', BookingSchema);
