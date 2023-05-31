import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const PORT = process.env.PORT || 3001;
const corsOptions = { origin: ['http://localhost:5173'] };
const app = express();

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));

// Server
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
