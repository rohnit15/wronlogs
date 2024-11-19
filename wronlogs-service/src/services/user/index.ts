import { User } from '../../models/schemas/user';
import { UserBody } from './index.types';
import bcrypt from 'bcrypt';

const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const createUser = async (body: UserBody): Promise<InstanceType<typeof User>> => {
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
        role: body.role || 'basic'
    });
    await userDetails.save();
    return userDetails;
};

export const getAllUsers = async (): Promise<InstanceType<typeof User>[]> => {
    return await User.find().populate('posts').populate('likes');
};

export const getUserById = async (id: string): Promise<InstanceType<typeof User> | null> => {
    return await User.findById(id).populate('posts').populate('likes');
};

export const authenticateUser = async (username: string, password: string): Promise<InstanceType<typeof User> | null> => {
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
