import express, { json } from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";

dotenv.config();

const PORT = process.env.port || 4000;

const app = express();

// middle ware below
  app.use(express.json());

console.log("my port:", process.env.PORT);
// id userid title amount are proprties associated with the transaction isEntityName.
async function connectToDB() {
  try {
     await sql`CREATE TABLE IF NOT EXISTS transactions(
     id SERIAL PRIMARY KEY,
     user_id VARCHAR(255) NOT NULL,
     title VARCHAR(255) NOT NULL,
     amount DECIMAL(10, 2) NOT NULL,
     category VARCHAR(255) NOT NULL,
     created_at DATE NOT NULL DEFAULT CURRENT_DATE
     
     )`
     console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
     process.exit(1);

    //  status 1 means failure while 0 means success
  }
}

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "You have got this Yemo! Believe in yourself!!!" });
});


app.delete("/api/transactions/:id", async (req, res)=> {
// the immeadiate below we are wrapping the id around the Url

const {id} = req.params

if(isNaN(parseInt(id))) {
  return res.status(400).json({message: 'Invalid Transaction Id'})
}
  try {
     

    const transactions = await sql`
    DELETE FROM transactions WHERE id = ${id} RETURNING *
    `

    if(transactions.length === 0){
      return res.status(404).json({message: "Transaction not found"})
    }
    res.status(200).json({message: 'Deleted transactions Successfully'})
    
  } catch (error) {

      console.error("Error deleting the transactions:", error);
  res.status(500).json({ error: "Internal Server Error" });
    
  }
})

app.get("/api/transactions/summary/:userId", async (req, res) => {


  try {
     const {userId} = req.params
    // we put 0 as the fall back value because when you just sign up, you have no transactions
  const totalBalanceResult = await sql `
  SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}
  `

  const incomeResult = await sql `
   SELECT COALESCE(SUM(amount), 0) as income  FROM transactions WHERE user_id = ${userId} AND amount > 0
  `

   const expenseResult = await sql `
   SELECT COALESCE(SUM(amount), 0) as expense  FROM transactions WHERE user_id = ${userId} AND amount < 0

  `
   res.status(200).json({
    balance: totalBalanceResult[0].balance,
    income: incomeResult[0].income,
    expense: expenseResult[0].expense
  })
  } catch (error) {
      console.error("Error getting transaction Summary:", error);
  res.status(500).json({ error: "Internal Server Error" });
  }
})



app.get("/api/transactions/:userId", async (req, res) => {

  try {
    const {userId} = req.params
     console.log(userId)

   const transactions  = await sql`
    SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
    `
    res.status(200).json(transactions)
  } catch (error) {
    console.error("Error getting transaction:", error);
  res.status(500).json({ error: "Internal Server Error" });
  }
})

app.post('/api/transactions', async (req, res) => {
// title , amount, category, user_id

try{
const { title, amount, category, user_id } = req.body;
if(!title || !amount || !category || !user_id){
  return res.status(400).json({ error: "All fields are required" });
}

   const transaction = await sql`
INSERT INTO transactions (title, amount, category, user_id)
 VALUES (${title}, ${amount}, ${category}, ${user_id}) RETURNING *
`
 console.log("Request body:", transaction);
   res.status(201).json(transaction);
}

catch(error){
  console.error("Error creating transaction:", error);
  res.status(500).json({ error: "Internal Server Error" });
}


})



connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on: ${PORT}`);
  });
});





