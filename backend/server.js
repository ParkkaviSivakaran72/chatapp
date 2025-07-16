import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB  from './config/mongodb.js';
import dotenv from 'dotenv';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routers/userrouter.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


connectDB();
connectCloudinary();

app.use('/api/user',userRouter)

app.get('/',(req,res) => {
    console.log("Server is running");
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})