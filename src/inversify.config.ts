import { User } from './entities/User';
import { MongoRepository } from 'typeorm';
import { AsyncContainerModule } from "inversify";
import { getDbConnection } from "./entities/db";
import { TYPES } from './constants/types';
import { getRepository } from './entities/userRepository';



export const bindings = new AsyncContainerModule(async (bind) => {

    await getDbConnection();
    await require('./controller/user');

    bind<MongoRepository<User>>(TYPES.UserRepository).toDynamicValue(() => {
        return getRepository();
    }).inRequestScope();
});