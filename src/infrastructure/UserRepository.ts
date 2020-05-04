import { getConnection } from 'typeorm';
import { User } from '../entities/User';

export function getRepository() {
    const conn = getConnection();
    const userRepository = conn.getMongoRepository(User);
    return userRepository;
}