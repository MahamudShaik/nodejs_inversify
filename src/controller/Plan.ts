import { IPlanService } from './../interfaces/IPlanService';
import { TYPES } from '../constants/types';
import { controller, httpGet, httpPost, response, requestParam, requestBody } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from "express";
import { Plan } from '../entities/Plan';


@controller('/plan')
export class PlanController {
    constructor(@inject(TYPES.IPlanService) private IPlanService: IPlanService) { }

    @httpGet('/')
    public Plans(@response() res: express.Response): Promise<Plan[]> {
        try {
            return this.IPlanService.getPlans();
        }
        catch (ex) {
            res.status(500);
            res.send(ex.message);
        }
    }

    @httpGet('/:id')
    public Plan(@response() res: express.Response, @requestParam("id") id: string): Promise<Plan> {
        try {
            return this.IPlanService.getPlan(id);
        }
        catch (ex) {
            res.status(500);
            res.send(ex.message);
        }
    }

    @httpPost('/')
    public newPlan(@response() res: express.Response, @requestBody() newPlan: Plan) {
        try {
            this.IPlanService.newPlan(newPlan);
        }
        catch (ex) {
            res.status(500);
            res.send(ex.message);
        }
    }

    // @httpPut('/:id')
    // public updatePlan(request: Request): Promise<Plan> {
    //     return this.IPlanService.updatePlan(request.params.id, request.body);
    // }

    // @httpDelete('/:id')
    // public deletePlan(request: Request): Promise<any> {
    //     return this.IPlanService.deletePlan(request.params.id);
    // }

}