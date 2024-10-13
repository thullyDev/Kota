import "dotenv/config";

export const DATABASE_URL = process.env.DATABASE_URL as string;
export const SECRET_KEY = process.env.SECRET_KEY as string;
export const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN as string;
export const PORT = process.env.FRONTEND_ORIGIN || 3000;
