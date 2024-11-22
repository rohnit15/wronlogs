import { Request, Response } from 'express';
import { getPosts } from '@/services/post';

export const getPostsController = async (req: Request, res: Response) => {
  const posts = await getPosts();
  res.send(posts);
};
