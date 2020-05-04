import { getConnection } from 'typeorm';
import { Plan } from '../entities/Plan';

export function planRepository() {
    const conn = getConnection();
    const userRepository = conn.getMongoRepository(Plan);
    return userRepository;
}