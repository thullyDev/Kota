import { defineConfig } from "drizzle-kit";
import "dotenv/config";

// import ""

export default defineConfig({
  schema: "./src/database/drizzle/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
