import { Plan } from './entities/Plan';
import { User } from './entities/User';
import { MongoRepository } from 'typeorm';
import { AsyncContainerModule } from "inversify";
import { getDbConnection } from "./entities/db";
import { TYPES } from './constants/types';
import { getRepository } from './infrastructure/UserRepository';
import { planRepository } from './infrastructure/PlanRepository';



export const bindings = new AsyncContainerModule(async (bind) => {

    await getDbConnection();
    await require('./controller/user');
    await require('./controller/Plan')

    bind<MongoRepository<User>>(TYPES.UserRepository).toDynamicValue(() => {
        return getRepository();
    }).inRequestScope();

    bind<MongoRepository<Plan>>(TYPES.PlanRepository).toDynamicValue(() => {
        return planRepository();
    }).inRequestScope();
});