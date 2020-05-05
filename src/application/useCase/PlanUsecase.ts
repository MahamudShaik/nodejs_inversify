import { IPlanUsecase } from './IPlanUsecase';
import { Plan } from '../../domain/Plan';
import { injectable, inject } from "inversify";
import { TYPES } from "../../constants/types";
import { MongoRepository } from "typeorm";
import IPlanDto from './IPlanDto';



@injectable()
export class PlanUsecase implements IPlanUsecase {

    public readonly _planRepository: MongoRepository<Plan>;

    constructor(@inject(TYPES.PlanRepository) planRepository: MongoRepository<Plan>) {
        this._planRepository = planRepository;
    }


    public getPlans(): Promise<Plan[]> {

        return this._planRepository.find();
    };


    public getPlan(name: string): Promise<Plan> {
        return this._planRepository.findOne({ name: name });
    }

    public async newPlan(plan: IPlanDto): Promise<Plan> {
        return this._planRepository.save(plan);
    }

    public updatePlan(name: string, plan: IPlanDto): Promise<any> {
        return this._planRepository.update({ name: name }, plan);
    }

    public deletePlan(name: string): Promise<any> {
        return this._planRepository.deleteOne({ name: name });
    }
}