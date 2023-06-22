import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connection = {
  isConnected: false,
};

const dbConnect = async () => {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
