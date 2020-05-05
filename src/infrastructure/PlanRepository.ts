import { getConnection } from 'typeorm';
import { Plan } from '../domain/Plan';

export function getPlanRepository() {
    const conn = getConnection();
    const userRepository = conn.getMongoRepository(Plan);
    return userRepository;
}