import { IPlanService } from '../../application/useCase/IPlanUsecase';
import { TYPES } from '../../constants/types';
import { controller, httpGet, httpPost, response, requestParam, requestBody } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from "express";
import { Plan } from '../../domain/Plan';
import IPlanDto from '../../application/useCase/IPlanDto';


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
    public newPlan(@response() res: express.Response, @requestBody() newPlan: IPlanDto) {
        try {
            return this.IPlanService.newPlan(newPlan);
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