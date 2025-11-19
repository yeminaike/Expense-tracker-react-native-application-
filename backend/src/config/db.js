import {neon} from "@neondatabase/serverless"
import "dotenv/config"

// creates a sql connection to the database. Its also a sql function used to run sql queries safely.

export const sql = neon(process.env.DATABASE_URL)



export async function connectToDB() {
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
