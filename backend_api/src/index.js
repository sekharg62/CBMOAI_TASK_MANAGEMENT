import express from 'express';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});
import mongoose from 'mongoose';
import cors from 'cors';
import taskRoute from './routes/taskRoute.js'


const app = express();

// If you need more control, you can configure CORS options
app.use(cors({
  origin: '*', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  //allowedHeaders: ['Content-Type'] // Allowed headers
})); 

app.use(express.json());
app.use('/',taskRoute);



mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
   

const PORT =  process.env.PORT|| 3000;



app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
})