import cookieParser from 'cookie-parser';
import cors from 'cors'
import express from "express";
import User from './routes/user.route.js'
const app = express()
import dotenv from "dotenv"
dotenv.config({ path: "../../.env" }) 


app.use(cookieParser())

app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3002'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // allowed request headers
  credentials: true,  // allow cookies / authorization headers
}))

app.use(express.json())

app.use('/api/v1',User)

app.listen(3000,()=>{
  console.log(`Server started at PORT 3000`);
})