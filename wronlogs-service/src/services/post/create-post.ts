import { Post } from '@models/schemas/post';

export const createPost = async (postData: {
  title: string;
  body: string;
  createdBy: string;
}) => {
  const post = new Post(postData);
  await post.save();
  return post;
};
