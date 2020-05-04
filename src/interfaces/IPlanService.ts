import { Plan } from "./IPlan";

export interface IPlanService {
    getPlans(): Promise<Plan[]>;
    getPlan(id: string): Promise<Plan>;
    newPlan(user: Plan): Promise<Plan>;
    updatePlan(id: string, user: Plan): Promise<Plan>;
    deletePlan(id: string): Promise<any>;
}