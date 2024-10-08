import 'dotenv/config';
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

async function main() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL!,
    });
    const db = drizzle(pool);
}

main();