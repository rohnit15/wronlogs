import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { authenticateUser } from '../../services/user';

export const authenticateUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { username, password } = req.body;
  console.log(`Received authentication request for username: ${username}`);
  if (!username || !password) {
    res.status(400).send({ error: 'Username and password are required' });
    return;
  }
  try {
    const user = await authenticateUser(username, password);
    if (!user) {
      res.status(401).send({ error: 'Invalid credentials' });
      return;
    }
    console.log(`User found: ${user.username}, verifying hashed password.`);
    const token = jwt.sign(
      { id: user._id, role: user.role },
      'your_secret_key',
      { expiresIn: '1h' },
    );
    res.send({ token });
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).send({ error: 'Error authenticating user' });
  }
};
