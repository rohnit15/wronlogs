import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

export const User = mongoose.model('User', userSchema);
