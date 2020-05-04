import { IPlanService } from './../interfaces/IPlanService';
import { Plan } from '../interfaces/IPlan';
import { TYPES } from '../constants/types';
import { controller, httpGet, httpDelete, httpPut, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';


@controller('/plan')
export class PlanController {
    constructor(@inject(TYPES.IPlanService) private IPlanService: IPlanService) { }

    @httpGet('/')
    public Plans(): Promise<Plan[]> {
        return this.IPlanService.getPlans();
    }

    @httpGet('/:id')
    public Plan(request: Request): Promise<Plan> {
        return this.IPlanService.getPlan(request.params.id);
    }

    @httpPost('/')
    public newPlan(request: Request): Promise<Plan> {
        return this.IPlanService.newPlan(request.body);
    }

    @httpPut('/:id')
    public updatePlan(request: Request): Promise<Plan> {
        return this.IPlanService.updatePlan(request.params.id, request.body);
    }

    @httpDelete('/:id')
    public deletePlan(request: Request): Promise<any> {
        return this.IPlanService.deletePlan(request.params.id);
    }

}