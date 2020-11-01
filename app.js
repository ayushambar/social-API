const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const expressValidator = require('express-validator');

const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config();
 
//db connection
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true, useUnifiedTopology: true},
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

//bring in routes :
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

//middleware :       (used for functionalities like authentication)
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use("/", postRoutes);		//Gets request and gives control to ./routes/post
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error : 'Unauthorized!'});
  }
});

const port=process.env.PORT || 8080;
app.listen(port, ()=>{console.log(`A node js api is listening on port ${port}`)});