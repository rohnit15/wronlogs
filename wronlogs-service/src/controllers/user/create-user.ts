import { Request, Response } from 'express';
import { createUser } from '@/services/user';

export const createUserController = async (req: Request, res: Response): Promise<void> => {
    const { username, name, emailId, password } = req.body;
    if (!username || !name || !emailId || !password) {
        res.status(400).send({ error: 'Username, name, emailId, and password are required' });
        return;
    }
    try {
        const user = await createUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error creating user' });
    }
};
