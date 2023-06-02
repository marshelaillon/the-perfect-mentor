import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    const db = await mongoose.connect(`${process.env.DB_URL}`);
    console.log(`Connected to ${db.connection.name} database`);
  } catch (error: any) {
    console.log(error.message);
  }
}
