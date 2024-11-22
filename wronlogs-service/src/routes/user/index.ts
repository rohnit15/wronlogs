import express, { Router } from 'express';
import { createUserController } from '@/controllers/user/create-user';
import { getAllUsersController } from '@/controllers/user/get-user';
import { authenticateUserController } from '@/controllers/user/authenticate-user';

const router: Router = express.Router();

router.post('/', createUserController);

router.get('/', getAllUsersController);

router.post('/authenticate', authenticateUserController);

export default router;
