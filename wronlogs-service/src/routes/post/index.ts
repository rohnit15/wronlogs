import { createPostController } from '@/controllers/post/create-post';
import { getPostsController } from '@/controllers/post/get-post';
import { authenticateToken } from '@/utils/authenticate-token';
import express from 'express';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  await createPostController(req, res);
});

router.get('/', authenticateToken, async (req, res) => {
  await getPostsController(req, res);
});

export default router;
