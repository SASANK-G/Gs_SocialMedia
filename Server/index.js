import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js'
import postRoute from './Routes/postRoute.js'

const app = express();


//MiddleWare
app.use(bodyParser.json({limit:'30mb', extended: 'true'}));
app.use(bodyParser.urlencoded({limit:'30mb', extended: 'true'}))

dotenv.config()

mongoose.connect(process.env.MONGO_DB,{useNewUrlParser:true, useUnifiedTopology:true})
.then(console.log("MongoDb connected"))
.catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server is listening at http://localhost:${process.env.PORT}`);
});



//Routes

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', postRoute)