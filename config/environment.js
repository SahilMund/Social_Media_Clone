const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const dotenv = require('dotenv');
dotenv.config();

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  MONGO_URL : "mongodb://127.0.0.1:27017/",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "FB_Clone_Development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587, // for TLS protocol
    secure: false,
    auth: {
      // removing/changing the below mail ID and password as i will be submitting it
      user: "17gietuece032@gmail.com",
      pass: "jtwzpcvhnvptgfyc",
    },
  },
  google_client_id:
    "261346878136-vbg87ph57rp7a7jonbtqufo5sb2d1gig.apps.googleusercontent.com",
  google_client_secret: "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",
  google_call_back_url: "http://localhost:8000/users/auth/google/callback",

  github_keys: {
    clientID: "6ca8a7e31d96a328b89b",
    clientSecret: "319ea7cf71aba059ccf8bbdc13e46881f8592d0b",
    callbackURL: "http://localhost:8000/users/auth/github/callback",
  },

  
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  MONGO_URL : process.env.CODIEAL_MONGO_URI,
  asset_path: process.env.CODEIAL_ASSET_PATH,
  session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
  db: process.env.CODIEL_DB_NAME,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CODEIAL_GMAIL_USERNAME,
      pass: process.env.CODEIAL_GMAIL_PASSWORD,
    },
  },
  google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
  jwt_secret: process.env.CODEIAL_JWT_SECRET,
github_keys: {
  clientID: process.env.CODEIAL_GITHUB_CLIENT_ID,
  clientSecret: process.env.CODEIAL_GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CODEIAL_GITHUB_CALLBACK_URL
},
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

// console.log(process.env)

module.exports = 
  eval(process.env.NODE_ENV) == undefined
    ? development
    : eval(process.env.NODE_ENV);
