import express, { Router } from 'express';

import { authenticateUserController } from '@/controllers/user/authenticate-user';
import { createUserController } from '@/controllers/user/create-user';
import {
  getAllUsersController,
  getUserByTokenController,
} from '@/controllers/user/get-user';

const router: Router = express.Router();

router.post('/', createUserController);

router.get('/', getAllUsersController);

router.post('/authenticate', authenticateUserController);

router.get('/me', getUserByTokenController);

export default router;
