import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: string | object;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.header('usertoken');
  if (!token) {
    res.status(401).send({ error: 'Access denied. No token provided.' });
    return;
  }
  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded;
    next();
  } catch (ex) {
    if (ex instanceof Error && ex.name === 'TokenExpiredError') {
      res.status(401).send({ error: 'Token expired.' });
    } else {
      res.status(400).send({ error: 'Invalid token.' });
    }
  }
};
