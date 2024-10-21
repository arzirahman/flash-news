import dotenv from 'dotenv';

dotenv.config();

export const NEWS_API_PORT = process.env.NEWS_API_PORT ?? 5001;
export const NEWS_API_KEY = process.env.NEWS_API_KEY ?? '';