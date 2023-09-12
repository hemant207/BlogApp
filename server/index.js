require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const blogRouter  = require('./routes/blog.js')
const userRouter  = require('./routes/user.js')

const app = express();
app.use(cors());
app.use(express.json());

//use of middleware
app.use('/blogs',blogRouter);
app.use('/user',userRouter);



//conncection to db
mongoose.connect(process.env.mongo_uri).then((err)=>{
      console.log("connected to database succesfully");
  })

app.get('/',(req,res)=>{
res.send("This is Data from the server")
})

//starting the connection port
app.listen(3000,()=>{
    console.log("server is running on 3000")
})