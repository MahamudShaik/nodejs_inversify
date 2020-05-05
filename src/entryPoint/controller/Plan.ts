import { IPlanUsecase } from '../../application/useCase/IPlanUsecase';
import { TYPES } from '../../constants/types';
import { controller, httpGet, httpPost, response, requestParam, requestBody, httpPut, httpDelete } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from "express";
import { Plan } from '../../domain/Plan';
import IPlanDto from '../../application/useCase/IPlanDto';


@controller('/plan')
export class PlanController {
    constructor(@inject(TYPES.IPlanUsecase) private IplanUsecase: IPlanUsecase) { }

    @httpGet('/')
    public async Plans(@response() res: express.Response): Promise<Plan[]> {
        try {
            return await this.IplanUsecase.getPlans();
        }
        catch (ex) {
            res.status(500);
            res.send(ex.message);
        }
    }

    @httpGet('/:name')
    public async Plan(@response() res: express.Response, @requestParam("name") name: string) {
        try {
            let plan = await this.IplanUsecase.getPlan(name);
            if (plan) {
                return plan;
            }
            else {
                res.status(400);
                res.send("Plan is not presnt with given plan name")
            }
        }
        catch (ex) {
            res.status(500);
            res.send(ex.message);
        }
    }

    @httpPost('/')
    public newPlan(@response() res: express.Response, @requestBody() newPlan: IPlanDto) {
        try {
            return this.IplanUsecase.newPlan(newPlan);
        }
        catch (ex) {
            res.status(500);
            res.send(ex.message);
        }
    }

    @httpPut('/:name')
    public updatePlan(@response() res: express.Response, @requestParam("name") name: string, @requestBody() newPlan: IPlanDto): Promise<Plan> {
        try {
            return this.IplanUsecase.updatePlan(name, newPlan);

        }
        catch (ex) {
            res.status(500);
            res.send(ex.message);
        }
    }

    @httpDelete('/:name')
    public async deletePlan(@requestParam("name") name: string, @response() res: express.Response): Promise<any> {
        try {

            await this.IplanUsecase.deletePlan(name);
            res.status(200);
            res.send("Successfully deleted");
        }
        catch (ex) {
            res.status(500);
            res.send(ex.message);
        }
    }

}