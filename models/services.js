// requiring mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ServiceSchema = new Schema({
    serviceIcon: String,
    serviceName: String,
    serviceDesc: String,
});



module.exports = mongoose.model('Service', ServiceSchema);
