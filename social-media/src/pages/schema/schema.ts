import mongoose from 'mongoose';


const schema = new mongoose.Schema({
  _id: String,
  name: String,
  email:String,
  username: String,
  password: String
});

export const AddUser = mongoose.models.users || mongoose.model("users",schema)
