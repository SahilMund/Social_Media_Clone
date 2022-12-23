const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/FB_Clone_Development', 
{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true });

//acquire the connection
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// once the conecction is established
db.once('open', function(){
    console.log('Connected to Database :: MongoDB - FB_Clone_Development');
});


module.exports = db;