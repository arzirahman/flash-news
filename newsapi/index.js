import express from 'express';
import cors from 'cors';
import { NEWS_API_PORT } from './config.js';
import { everything, topHeadlines } from './handler.js';

const app = express();
app.use(cors());

app.get("/top-headlines", topHeadlines);
app.get("/everything", everything);

app.listen(NEWS_API_PORT, () => {
    console.log(`Running on port ${NEWS_API_PORT}`);
})