import { Request, Response } from 'express';

import { getAllUsers, getUserById, getUserByToken } from '@/services/user';

export const getAllUsersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.query.id as string;
  if (userId) {
    try {
      const user = await getUserById(userId);
      if (!user) {
        res.status(404).send({ error: 'User not found' });
        return;
      }
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error fetching user' });
    }
  } else {
    try {
      const users = await getAllUsers();
      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error fetching users' });
    }
  }
};

export const getUserByTokenController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const token: string = String(req.headers.usertoken);
  if (!token) {
    res.status(400).send({ error: 'Token is required' });
    return;
  }
  try {
    const user = await getUserByToken(token);
    if (!user) {
      res.status(404).send({ error: 'User not found' });
      return;
    }
    res.send(user);
  } catch (error) {
    console.error('Error fetching user by token:', error);
    res.status(500).send({ error: 'Error fetching user' });
  }
};
