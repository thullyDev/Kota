import "dotenv/config";

export const DATABASE_URL = process.env.DATABASE_URL as string;
export const SECRET_KEY = process.env.SECRET_KEY as string;
export const ORIGINS = process.env.ORIGINS as string;
