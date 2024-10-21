import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { NEWS_API_PORT } from './config.js';
import { everything, topHeadlines } from './handler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'dist')));

app.get("/api/top-headlines", topHeadlines);
app.get("/api/everything", everything);

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(NEWS_API_PORT, () => {
    console.log(`Running on port ${NEWS_API_PORT}`);
})