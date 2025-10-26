import {neon} from "@neondatabase/serverless"
import "dotenv/config"

// creates a sql connection to the database

export const sql = neon(process.env.DATABASE_URL)