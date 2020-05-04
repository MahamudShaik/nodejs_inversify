import { User } from './User';
import { createConnection, Connection } from 'typeorm';
import { config } from '../../config';


export async function getDbConnection() {

    const entities = [
        User
    ]
    const connection: Connection = await createConnection({
        type: "mongodb",
        url: config.CONNECTION_STRING,
        useNewUrlParser: true,
        database: config.DATABASE,
        synchronize: true,
        logging: true,
        entities: entities
    });
    return connection;
}