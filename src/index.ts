import 'reflect-metadata';
import { CustomAuthProvider } from './entryPoint/middleware/customAuthProvider';
import { bindings } from './configuration/useCase/inversify.config';
import { config } from './configuration/useCase/config';
import { PlanService } from './application/useCase/PlanUsecase';
import { IPlanService } from './application/useCase/IPlanUsecase';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { TYPES } from './constants/types';
import * as express from 'express';
import './entryPoint/controller/home';
import './entryPoint/controller/Auth';

(async () => {
    // load everything needed to the Container
    let container = new Container();
    await container.loadAsync(bindings);
    // container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);
    container.bind<IPlanService>(TYPES.IPlanService).to(PlanService);
    //let start the server
    let server = new InversifyExpressServer(container, null, null, null, CustomAuthProvider);

    server.setConfig((app) => {

        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
    });

    server.setErrorConfig((app) => {
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json("something broke.")
        });
    })

    let serverInstance = server.build();
    serverInstance.listen(config.PORT, () => {
        console.log(`server is started at  ${config.PORT}`);
    });

})();