import { Request, Response } from 'express';
import { getAllUsers, getUserById } from '@/services/user';

export const getAllUsersController = async (req: Request, res: Response): Promise<void> => {
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
