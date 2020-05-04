import { Plan } from "../entities/Plan";

export interface IPlanService {
    getPlans(): Promise<Plan[]>;
    getPlan(id: string): Promise<Plan>;
    newPlan(user: Plan): Promise<Plan>;
    // updatePlan(id: string, user: Plan): void;
    // deletePlan(id: string): void;
}