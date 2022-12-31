const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const kue = require('kue');

const port = 8000; // Each services are recognized by PORT numbers
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passportGithub = require('./config/passport-github2-strategy');

const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/flash-middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000..........');


//middleware used to parse the data coming from the ejs form
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//adding static files
app.use(express.static('./assets'));

// make the uploads path available to the browser -- For multer
app.use('/uploads', express.static(__dirname + '/uploads'));

// to see the kue-dashboard  --> http://localhost:8000/kue-api/
// app.use("/kue-api/", kue.app);

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'FbClone',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) //validity - 100 min
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port} ..........`);
});
