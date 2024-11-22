import { Post } from '@models/schemas/post';

export const getPosts = async () => {
  const posts = await Post.find().populate('likes');
  return posts;
};
