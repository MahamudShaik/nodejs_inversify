import { IPlanUsecase } from '../../application/useCase/IPlanUsecase';
import { TYPES } from '../../constants/types';
import { controller, httpGet, httpPost, response, requestParam, requestBody, httpPut, httpDelete } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from "express";
import { Plan } from '../../domain/Plan';
import IPlanDto from '../../application/useCase/IPlanDto';
import { logger } from '../../configuration/useCase/logger';


@controller('/plan')
export class PlanController {
    constructor(@inject(TYPES.IPlanUsecase) private IplanUsecase: IPlanUsecase) { }

    @httpGet('/')
    public async Plans(@response() res: express.Response): Promise<Plan[]> {
        try {
            logger.info('Plan/plans Incoming  get all Request')
            return await this.IplanUsecase.getPlans();
        }
        catch (ex) {
            logger.error(`Plan/plans Request failed error is ${ex}`)
            res.status(500);
            res.send(ex.message);
        }
    }

    @httpGet('/:name')
    public async Plan(@response() res: express.Response, @requestParam("name") name: string) {
        try {
            logger.info(`Plan/plan Incoming   get Request name is ${name}`)
            let plan = await this.IplanUsecase.getPlan(name);

            if (plan) {
                logger.info('Plan/plan Incoming   get Request name is completed , plan is retrived ');
                return plan;
            }
            else {
                logger.error('Plan/plan Incoming   get Request failed , given name is invalid ');
                res.status(400);
                res.send("Plan is not presnt with given plan name")
            }
        }
        catch (ex) {
            logger.error(`Plan/plan get name Request failed. error is ${ex}`)
            res.status(500);
            res.send(ex.message);
        }
    }

    @httpPost('/')
    public newPlan(@response() res: express.Response, @requestBody() newPlan: IPlanDto) {
        try {
            logger.info(`Plan/newPlan  Incoming   PoST Request body is ${JSON.stringify(newPlan)}`);

            return this.IplanUsecase.newPlan(newPlan);
        }
        catch (ex) {
            logger.error(`Plan/newPlan POST Request failed. error is ${ex}`)
            res.status(500);
            res.send(ex.message);
        }
    }

    @httpPut('/:name')
    public updatePlan(@response() res: express.Response, @requestParam("name") name: string, @requestBody() newPlan: IPlanDto): Promise<Plan> {
        try {
            logger.info(`Plan/updatePlan  Incoming   PUT Request body is ${JSON.stringify(newPlan)} and param is ${name}`);

            return this.IplanUsecase.updatePlan(name, newPlan);

        }
        catch (ex) {
            logger.error(`Plan/updatePlan PUT Request failed. error is ${ex}`)
            res.status(500);
            res.send(ex.message);
        }
    }

    @httpDelete('/:name')
    public async deletePlan(@requestParam("name") name: string, @response() res: express.Response): Promise<any> {
        try {
            logger.info(`Plan/updatePlan  Incoming   DELETE Request  param is ${name}`);
            await this.IplanUsecase.deletePlan(name);
            logger.info(`Plan/updatePlan  Incoming   DELETE Request completed for  ${name}`);

            res.status(200);
            res.send("Successfully deleted");
        }
        catch (ex) {
            logger.error(`Plan/updatePlan DELETE Request failed. error is ${ex}`)
            res.status(500);
            res.send(ex.message);
        }
    }
}