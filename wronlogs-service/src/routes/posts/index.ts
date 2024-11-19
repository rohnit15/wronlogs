import express from 'express';
import { Post } from '../../models/schemas/post';


const router = express.Router();

router.post('/', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.status(201).send(post);
});

router.get('/', async (req, res) => {
  const posts = await Post.find().populate('likes');
  res.send(posts);
});

export default router;
