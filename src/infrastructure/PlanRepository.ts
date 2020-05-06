import { getConnection } from 'typeorm';
import { Plan } from '../domain/Plan';
import { logger } from '../configuration/useCase/logger';

export function getPlanRepository() {
    logger.info('trying to connect Plan Repository');
    const conn = getConnection();
    const userRepository = conn.getMongoRepository(Plan);
    logger.info('Connected to Plan Repository');
    return userRepository;
}