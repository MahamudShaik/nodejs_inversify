import { IPlanUsecase } from './IPlanUsecase';
import { Plan } from '../../domain/Plan';
import { injectable, inject } from "inversify";
import { TYPES } from "../../constants/types";
import { MongoRepository } from "typeorm";
import IPlanDto from './IPlanDto';
import { logger } from '../../configuration/useCase/logger';



@injectable()
export class PlanUsecase implements IPlanUsecase {

    public readonly _planRepository: MongoRepository<Plan>;

    constructor(@inject(TYPES.PlanRepository) planRepository: MongoRepository<Plan>) {
        this._planRepository = planRepository;
    }


    public getPlans(): Promise<Plan[]> {
        logger.info('PlanUsecase/getplans started');
        return this._planRepository.find();
    };


    public getPlan(name: string): Promise<Plan> {
        logger.info(`PlanUsecase/getplan started for name ${name}`);
        return this._planRepository.findOne({ name: name });
    }

    public async newPlan(plan: IPlanDto): Promise<Plan> {
        logger.info(`PlanUsecase/newplan adding new plan in repo`);
        return this._planRepository.save(plan);
    }

    public async updatePlan(name: string, plan: IPlanDto): Promise<any> {
        logger.info(`PlanUsecase/updatePlan started for name ${name}`);
        await this._planRepository.update({ name: name }, plan);
        return this._planRepository.findOne({ name: name });
    }

    public deletePlan(name: string): Promise<any> {
        logger.info(`PlanUsecase/deletePlan started for name ${name}`);
        return this._planRepository.deleteOne({ name: name });
    }
}