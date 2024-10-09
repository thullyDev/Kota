import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./src/utilities/config";

// import ""

export default defineConfig({
  schema: "./src/database/drizzle/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
