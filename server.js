import express from 'express'
import cors from 'cors'
import dotenv from  'dotenv'
import connectDB from './db/Mongodatabase.js';
import Userrouter from './Routes/Userroutes.js';
import Postrouter from './Routes/Postroutes.js'
import cookieParser from 'cookie-parser';



const app=express();
app.use(cors());
app.use(express.json())
dotenv.config();
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

connectDB();


app.use('/api/users',Userrouter);
app.use('/api/blogposts',Postrouter)




app.listen(4000,()=>console.log('succfully'));

