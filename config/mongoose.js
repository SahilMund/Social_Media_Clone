const mongoose = require('mongoose');


const env = require('./environment');

const DB_NAME = env.db;

//connect to the database
// MONGO_URL = mongodb+srv://SahilMund:yqMwFzKsexJZX3mx@cluster0.oekbxpu.mongodb.net/
mongoose.connect(`${env.MONGO_URL}${DB_NAME}`, 
{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true });

//acquire the connection
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// once the conecction is established
db.once('open', function(){
    console.log(`Connected to Database :: MongoDB - ${DB_NAME}`);
});


module.exports = db;