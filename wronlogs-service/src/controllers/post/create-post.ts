import { Response } from 'express';
import { CreatePostRequest } from './index.types';
import { createPost } from '@/services/post';

export const createPostController = async (
  req: CreatePostRequest,
  res: Response,
) => {
  const post = await createPost(req.body);
  res.status(201).send(post);
};
