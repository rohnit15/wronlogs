import mongoose from 'mongoose';

export const postSchema = new mongoose.Schema({
  title: String,
  createdDate: { type: Date, default: Date.now },
  body: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Post = mongoose.model('Post', postSchema);
