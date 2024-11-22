import bcrypt from 'bcrypt';

import { UserBody } from './index.types';
import { isEmailValid } from './util';

import { User } from '@/models/schemas/user';

export const createUser = async (
  body: UserBody,
): Promise<InstanceType<typeof User>> => {
  if (body.username.length < 6) {
    throw new Error('Username must be at least 6 characters long');
  }
  if (body.password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
  if (!isEmailValid(body.emailId)) {
    throw new Error('Invalid email format');
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const userDetails = new User({
    username: body.username,
    name: body.name,
    emailId: body.emailId,
    password: hashedPassword,
    role: body.role || 'basic',
  });
  await userDetails.save();
  return userDetails;
};
