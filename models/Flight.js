const mongoose = require('mongoose'); 
 
 
const flightSchema = new mongoose.Schema({ 
  from: { type: String, required: true }, 
  to: { type: String, required: true }, 
  airline: { type: String, required: true }, 
  price: { type: Number, required: true }, 
  departureTime: { type: String } 
}); 
 
const Flight = mongoose.model('Flight', 
flightSchema); 
 
module.exports = Flight;