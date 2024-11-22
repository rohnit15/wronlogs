import express from 'express';

import { createPostController } from '@/controllers/post/create-post';
import { getPostsController } from '@/controllers/post/get-post';
import {
  applyRateLimiter,
  authenticateToken,
} from '@/utils/authenticate-token';

const router = express.Router();

router.post('/', applyRateLimiter, authenticateToken, async (req, res) => {
  await createPostController(req, res);
});

router.get('/', applyRateLimiter, authenticateToken, async (req, res) => {
  await getPostsController(req, res);
});

export default router;
