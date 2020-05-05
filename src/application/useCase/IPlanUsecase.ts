import { Plan } from "../../domain/Plan";
import IPlanDto from "./IPlanDto";

export interface IPlanService {
    getPlans(): Promise<Plan[]>;
    getPlan(id: string): Promise<Plan>;
    newPlan(user: IPlanDto): Promise<Plan>;
    // updatePlan(id: string, user: Plan): void;
    // deletePlan(id: string): void;
}