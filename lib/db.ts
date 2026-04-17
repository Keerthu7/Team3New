import mongoose from 'mongoose';

// Bypass cached env string to immediately fix user's port block issue
const MONGODB_URI = "mongodb://Team3:Hynox@ac-pyp4j1h-shard-00-00.laszg0s.mongodb.net:27017,ac-pyp4j1h-shard-00-01.laszg0s.mongodb.net:27017,ac-pyp4j1h-shard-00-02.laszg0s.mongodb.net:27017/Team3?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
    console.log("Successfully connected to MongoDB");
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
