import { injectable, inject } from "inversify";
import { Plan } from "../interfaces/IPlan";
import { MongoDBClient } from "../mongoDB/client";
import { TYPES } from "../constants/types";



@injectable()
export class PlanService {

    private mongoClient: MongoDBClient;

    constructor(
        @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient
    ) {
        this.mongoClient = mongoClient;
    }


    public getPlans(): Promise<Plan[]> {

        return new Promise<Plan[]>((resolve, reject) => {
            this.mongoClient.find('plan', {}, (error, data: Plan[]) => {
                resolve(data);
            });
        });
    }

    public getPlan(id: string): Promise<Plan> {
        var query = { name: id };
        return new Promise<Plan>((resolve, reject) => {
            this.mongoClient.find('plan', query, (error, data: Plan) => {
                resolve(data);
            });
        });
    }

    public newPlan(user: Plan): Promise<Plan> {
        return new Promise<Plan>((resolve, reject) => {
            this.mongoClient.insert('plan', user, (error, data: Plan) => {
                resolve(data);
            });
        });
    }

    public updatePlan(id: string, user: Plan): Promise<Plan> {
        return new Promise<Plan>((resolve, reject) => {
            this.mongoClient.update('plan', id, user, (error, data: Plan) => {
                resolve(data);
            });
        });
    }

    public deletePlan(id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.mongoClient.remove('plan', id, (error, data: any) => {
                resolve(data);
            });
        });
    }
}