import { User } from '../../models/schemas/user';
import { UserBody } from './index.types';

export const createUser = async (body: UserBody): Promise<InstanceType<typeof User>> => {
    const userDetails = new User(body);
    await userDetails.save();
    return userDetails;
};
