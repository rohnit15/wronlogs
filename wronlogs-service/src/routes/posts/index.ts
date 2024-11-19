import express from 'express';
import { Post } from '../../models/schemas/post';
import { authenticateToken } from '../../utils/authenticate-token';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.status(201).send(post);
});

router.get('/', authenticateToken, async (req, res) => {
  const posts = await Post.find().populate('likes');
  res.send(posts);
});

export default router;
