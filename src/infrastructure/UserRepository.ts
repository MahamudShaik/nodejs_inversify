import { getConnection } from 'typeorm';
import { User } from '../domain/User';

export function getUserRepository() {
    const conn = getConnection();
    const userRepository = conn.getMongoRepository(User);
    return userRepository;
}