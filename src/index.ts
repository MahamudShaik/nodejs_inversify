import 'reflect-metadata';
import { CustomAuthProvider } from './entryPoint/middleware/customAuthProvider';
import { bindings } from './configuration/useCase/inversify.config';
import { config } from './configuration/useCase/config';
import { PlanUsecase } from './application/useCase/PlanUsecase';
import { IPlanUsecase } from './application/useCase/IPlanUsecase';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { TYPES } from './constants/types';
import * as express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import './entryPoint/controller/home';
import './entryPoint/controller/Auth';

(async () => {
    // load everything needed to the Container
    let container = new Container();
    await container.loadAsync(bindings);
    // container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);
    container.bind<IPlanUsecase>(TYPES.IPlanUsecase).to(PlanUsecase);
    //let start the server
    let server = new InversifyExpressServer(container, null, null, null, CustomAuthProvider);

    server.setConfig((app) => {
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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