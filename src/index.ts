import 'dotenv/config';
import connectDB from './config/database';
import cors from 'cors';
import express from 'express';
import router from './routes';
import morgan from 'morgan';

const PORT = process.env.PORT || 3001;
const corsOptions = { origin: ['http://localhost:5173'] };
const app = express();

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use('/api', router);

// Server
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Listening on port: ${PORT}`);
  } catch (error) {
    console.log((error as Error).message);
  }
});
