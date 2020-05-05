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
    public Plans(@response() res: express.Response): Promise<Plan[]> {
        try {
            return this.IplanUsecase.getPlans();
        }
        catch (ex) {
            res.status(500);
            res.send(ex.message);
        }
    }

    @httpGet('/:name')
    public Plan(@response() res: express.Response, @requestParam("name") name: string): Promise<Plan> {
        try {
            return this.IplanUsecase.getPlan(name);
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
        return this.IplanUsecase.updatePlan(name, newPlan);
    }

    @httpDelete('/:name')
    public deletePlan(@requestParam("name") name: string): Promise<any> {
        return this.IplanUsecase.deletePlan(name);
    }

}