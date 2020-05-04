import 'reflect-metadata';

import { CustomAuthProvider } from './middleware/customAuthProvider';
import { bindings } from './inversify.config';


import { MongoDBClient } from './mongoDB/client';
import { PlanService } from './service/PlanService';
import { IPlanService } from './interfaces/IPlanService';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { TYPES } from './constants/types';
import * as express from 'express';
//import { makeLoggerMiddleware } from 'inversify-logger-middleware';
import './controller/home';
import './controller/Plan';
import './controller/Auth';

(async () => {
    // load everything needed to the Container
    let container = new Container();



    await container.loadAsync(bindings);
    // container.bind<AuthMiddleware>(AuthMiddleware);
    container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);
    container.bind<IPlanService>(TYPES.IPlanService).to(PlanService);
    //let start the server
    let server = new InversifyExpressServer(container, null, null, null, CustomAuthProvider);

    server.setConfig((app) => {

        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
    })

    let serverInstance = server.build();
    serverInstance.listen(4000, () => {
        console.log("server is started at 4000");
    });

})();