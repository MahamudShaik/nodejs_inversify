import { Plan } from '../../domain/Plan';
import { injectable, inject } from "inversify";
import { TYPES } from "../../constants/types";
import { Repository } from "typeorm";



@injectable()
export class PlanService {

    public readonly _planRepository: Repository<Plan>;

    constructor(@inject(TYPES.PlanRepository) planRepository: Repository<Plan>) {
        this._planRepository = planRepository;
    }


    public getPlans(): Promise<Plan[]> {

        return this._planRepository.find();
    };


    public getPlan(id: string): Promise<Plan> {
        return this._planRepository.findOne({ id })
    }

    public async newPlan(plan: Plan): Promise<Plan> {
        return this._planRepository.save(plan);
    }

    // public updatePlan(id: string, user: Plan): void {
    //     return new Promise<Plan>((resolve, reject) => {
    //         this.mongoClient.update('plan', id, user, (error, data: Plan) => {
    //             resolve(data);
    //         });
    //     });
    // }

    // public deletePlan(id: string): void {
    //     return new Promise<any>((resolve, reject) => {
    //         this.mongoClient.remove('plan', id, (error, data: any) => {
    //             resolve(data);
    //         });
    //     });
    // }
}