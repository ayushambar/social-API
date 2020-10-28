const express = require('express');
const app = express();
const morgan = require('morgan');

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

//middleware :       (used for functionalities like authentication)
app.use(morgan("dev"));
// app.get("/",getPosts);
app.use("/", postRoutes);		//now this works as middleware. Gets request and gives control to ./routes/post

const port=process.env.PORT || 8080;
app.listen(port, ()=>{console.log(`A node js api is listen on port ${port}`)});