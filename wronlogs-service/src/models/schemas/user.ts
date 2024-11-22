import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['basic', 'author', 'admin'], default: 'basic' },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

export const User = mongoose.model('User', userSchema);
