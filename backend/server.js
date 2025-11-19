import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./src/config/db.js";
import rateLimiter from "./src/middleware/rateLimiter.js";
import  transactionsRoute from './src/routes/transactionsRoute.js'

dotenv.config();

const PORT = process.env.port || 4000;

const app = express();

// middle ware below
app.use(rateLimiter);
  app.use(express.json());

console.log("my port:", process.env.PORT);
// id userid title amount are proprties associated with the transaction isEntityName.



app.use('/api/transactions', transactionsRoute)
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on: ${PORT}`);
  });
});





