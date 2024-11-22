import axios from 'axios';
import { Response } from 'express';

import { CreatePostRequest } from './index.types';

import { createPost } from '@/services/post';

export const createPostController = async (
  req: CreatePostRequest,
  res: Response,
) => {
  const token = req.headers.usertoken;
  if (!token) {
    res.status(400).send({ error: 'Token is required' });
    return;
  }

  try {
    const userResponse = await axios.get('http://localhost:3000/users/me', {
      headers: { usertoken: token },
    });
    const userId = userResponse.data._id;

    const post = await createPost({
      title: req.body.title,
      body: req.body.body,
      createdBy: String(userId),
    });
    res.status(201).send(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send({ error: 'Error creating post' });
  }
};
