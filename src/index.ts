import 'reflect-metadata';
import { CustomAuthProvider } from './middleware/customAuthProvider';
import { bindings } from './inversify.config';
import { config } from '../config';
import { PlanService } from './service/PlanService';
import { IPlanService } from './interfaces/IPlanService';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { TYPES } from './constants/types';
import * as express from 'express';
//import { makeLoggerMiddleware } from 'inversify-logger-middleware';
import './controller/home';
import './controller/Auth';

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