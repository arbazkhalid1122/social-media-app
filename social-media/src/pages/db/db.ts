import mongoose from 'mongoose';

async function db() {
  try {
    const uri = "mongodb+srv://social-media:24680@social-media.jhrbvpp.mongodb.net/users?retryWrites=true&w=majority";
    await mongoose.connect(uri);
    console.log('mongodb connected successfully');
  } catch (error) {
    console.error('mongodb connection failed:', error);
  }
}

export default db;
