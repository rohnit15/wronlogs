import express from 'express';
import { User } from '../../models/schemas/user';


const router = express.Router();

router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
});

router.get('/', async (req, res) => {
  const users = await User.find().populate('posts').populate('likes');
  res.send(users);
});

export default router;
