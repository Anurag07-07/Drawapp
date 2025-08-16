import express from "express";
import User from './routes/user.route.js'
const app = express()

app.use(express.json())

app.use('/api/v1',User)

app.listen(3000,()=>{
  console.log(`Server started at PORT 3000`);
})