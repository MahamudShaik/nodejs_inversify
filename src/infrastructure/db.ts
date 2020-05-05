import { Plan } from '../domain/Plan';
import { User } from '../domain/User';
import { createConnection, Connection } from 'typeorm';
import { config } from '../configuration/useCase/config';


export async function getDbConnection() {

    const entities = [
        User,
        Plan
    ]
    const connection: Connection = await createConnection({
        type: "mongodb",
        url: config.CONNECTION_STRING,
        useNewUrlParser: true,
        database: config.DATABASE,
        synchronize: true,
        logging: true,
        entities: entities,
        useUnifiedTopology: true
    });
    return connection;
}