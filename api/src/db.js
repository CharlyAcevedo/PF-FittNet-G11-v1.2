require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_DB = process.env.MONGO_DB || "mongodb://localhost/prueba"

mongoose.connect(MONGO_DB, ()=>{    
    console.log('conected to DB Mongo')
}, err => console.error(err))

module.exports = { 
    conn: mongoose,    
  };
