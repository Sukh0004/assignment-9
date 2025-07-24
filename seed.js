 
const mongoose = require('mongoose'); 
const dotenv = require('dotenv'); 
const Flight = require('./models/Flight'); 
 
dotenv.config(); 
 
mongoose.connect(process.env.MONGODB_URI) 
  .then(() => { 
    console.log('Connected to MongoDB Atlas'); 
    return Flight.insertMany([ 
      { from: "YVR", to: "JFK", airline: 
"Air Canada", price: 350, departureTime: 
"08:30" }, 
      { from: "YVR", to: "YYZ", airline: 
"WestJet", price: 280, departureTime: 
"09:45" }, 
      { from: "YYZ", to: "JFK", airline: 
"Porter Airlines", price: 320, 
departureTime: "11:00" }, 
      { from: "YYZ", to: "YUL", airline: 
"Air Canada", price: 250, departureTime: 
"13:15" }, 
      { from: "YVR", to: "YYZ", airline: 
"Flair Airlines", price: 99, 
departureTime: "15:20" }, 
      { from: "YVR", to: "YYZ", airline: 
"Porter Airlines", price: 220, 
departureTime: "17:50" } 
    ]); 
 
  }) 
  .then(() => { 
    console.log('Seeded flight data'); 
    mongoose.disconnect(); 
  }) 
  .catch(err => { 
    console.error(err); 
    mongoose.disconnect(); 
  }); 