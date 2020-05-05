import { Plan } from "../../domain/Plan";
import IPlanDto from "./IPlanDto";

export interface IPlanUsecase {
    getPlans(): Promise<Plan[]>;
    getPlan(name: string): Promise<Plan>;
    newPlan(user: IPlanDto): Promise<Plan>;
    updatePlan(name: string, user: IPlanDto): Promise<any>;
    deletePlan(name: string): Promise<any>;
}