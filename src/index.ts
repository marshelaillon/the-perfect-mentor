import 'dotenv/config';
import config from 'config';
import connectDB from './utils/connectToDb';
import cors from 'cors';
import express from 'express';
import router from './routes';
import morgan from 'morgan';
import deserializeUser from './middlewares/deserializeUser';

const PORT = config.get('port');
const HOST = config.get('host');
const localOrigin = config.get<string>('localOrigin');
const proOrigin = config.get<string>('prodOrigin');
const corsOptions = {
  origin: [localOrigin, proOrigin],
};
const app = express();

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(deserializeUser);

app.use('/api/v1', router);

// Server
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on: http://${HOST}:${PORT}`);
  } catch (error) {
    console.log((error as Error).message);
  }
});
