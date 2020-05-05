import { Plan } from '../../domain/Plan';
import { User } from '../../domain/User';
import { MongoRepository } from 'typeorm';
import { AsyncContainerModule } from "inversify";
import { getDbConnection } from "../../infrastructure/db";
import { TYPES } from '../../constants/types';
import { getUserRepository } from '../../infrastructure/UserRepository';
import { getPlanRepository } from '../../infrastructure/PlanRepository';



export const bindings = new AsyncContainerModule(async (bind) => {

    await getDbConnection();
    await require('../../entryPoint/controller/user');
    await require('../../entryPoint/controller/Plan')

    bind<MongoRepository<User>>(TYPES.UserRepository).toDynamicValue(() => {
        return getUserRepository();
    }).inRequestScope();

    bind<MongoRepository<Plan>>(TYPES.PlanRepository).toDynamicValue(() => {
        return getPlanRepository();
    }).inRequestScope();
});