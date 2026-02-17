import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from './config/mongodb.js'
import  authRouter  from "./routes/authRoutes.js";
import userRouter from './routes/userRoutes.js'
import assignmentRouter from './routes/assignmentRoutes.js';



const app= express(); //creates an Express application object, and you store it in the variable app.
const port=process.env.PORT || 4000
connectDB();


const allowedOrigins = ['https://class-assignment-manager-1.onrender.com']

app.use(cors({
    origin: allowedOrigins,
    credentials: true,       // required for cookies
  }));


app.use(express.json()) //parses incoming JSON request bodies into JavaScript objects.
app.use(cookieParser())

  
//(first) API End point
app.get('/',(req, res)=> res.send("API  working"));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter) //to get user data


app.use('/api/assignments', assignmentRouter);

app.use('/uploads', express.static('uploads'));


app.listen(port,()=>console.log(`server started on Port:${port} `))









