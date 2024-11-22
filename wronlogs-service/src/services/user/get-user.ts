import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '@/models/schemas/user';

export const getAllUsers = async (): Promise<InstanceType<typeof User>[]> => {
  return await User.find().populate('posts').populate('likes');
};

export const getUserById = async (
  id: string,
): Promise<InstanceType<typeof User> | null> => {
  return await User.findById(id).populate('posts').populate('likes');
};

export const authenticateUser = async (
  username: string,
  password: string,
): Promise<InstanceType<typeof User> | null> => {
  console.log(`Authenticating user: ${username}`);
  const user = await User.findOne({ username });
  if (!user) {
    console.log('User not found');
    return null;
  }
  console.log(`Stored hashed password for user ${username}: ${user.password}`);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(`Password valid: ${isPasswordValid}`);
  if (!isPasswordValid) {
    console.log('Invalid password');
    return null;
  }
  console.log('User authenticated successfully');
  return user;
};

export const getUserByToken = async (
  token: string,
): Promise<InstanceType<typeof User> | null> => {
  try {
    const decoded = jwt.verify(token, 'your_secret_key') as { id: string };
    return await User.findById(decoded.id).populate('posts').populate('likes');
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};
