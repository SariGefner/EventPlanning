import mongoose from 'mongoose';

const connectDb = async (): Promise<void> => {

  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error('Missing MONGODB_URI in environment variables');
    }

    // Check if we are already connected
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB. Exiting connectDb function.');
      return; // Exit the function early
    }

    // If not connected, establish a new connection
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
    });

    console.log('Connected to MongoDB');

    // Optional: Add event listeners for connection monitoring
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to database');
  }
};

export default connectDb;
