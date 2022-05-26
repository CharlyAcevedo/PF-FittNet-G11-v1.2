require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_LOCAL_DB = process.env.MONGO_LOCAL_DB || "mongodb://localhost/prueba"

mongoose.connect(MONGO_LOCAL_DB, ()=>{
    
    console.log('conected to DB Mongo')
}, err => console.error(err))



module.exports = { 
    conn: mongoose,    
  };
