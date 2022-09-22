import express from 'express'
import Bodyparser  from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors";
import bank from "./routes/user.js"
import dotenv from 'dotenv';

const app= express()
dotenv.config()

app.use(cors())
app.use(Bodyparser.json())
app.use(Bodyparser.text())
app.use(express.json())
app.use(Bodyparser.urlencoded({extended:true}))

app.use("/api",bank)

mongoose.connect('mongodb://localhost/data')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));


app.listen(4000,()=>{
    console.log("server is running on 4000");
})
