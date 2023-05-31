import 'dotenv/config';
import connectDB from './config/database';
import cors from 'cors';
import express from 'express';
import RolModel from './models/rol/Rol.model';

const PORT = process.env.PORT || 3001;
const corsOptions = { origin: ['http://localhost:5173'] };
const app = express();

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));

// Server
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Listening on port: ${PORT}`);
  } catch (error) {
    console.log((error as Error).message);
  }
});

// async function executeQuery() {
//   const roles = await RolModel.find({}, { _id: 0 });
//   console.log(roles);
// }

// executeQuery();
