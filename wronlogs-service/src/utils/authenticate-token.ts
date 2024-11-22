import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: string | object;
}

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' },
});

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
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error('JWT secret key is not defined in environment variables');
    }
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    console.error('Token verification error:', ex);
    if (ex instanceof Error && ex.name === 'TokenExpiredError') {
      res.status(401).send({ error: 'Token expired.' });
    } else {
      res.status(400).send({ error: 'Invalid token.' });
    }
  }
};

// Apply rate limiter to all requests
export const applyRateLimiter = limiter;
