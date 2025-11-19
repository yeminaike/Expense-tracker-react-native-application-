import { sql } from "../config/db.js"

 export async  function getTransactionsByUserId(req, res){
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
}

export async function createTransaction (req, res){

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


}

export async function deleteTransaction (req, res){
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
}

export async function getSummaryByUserId(req, res){

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
}


// In the package.json  "dev": "nodemon src/server.js",for development
//  "start": "node src/server.js" for production








