import { User } from './User';
import { createConnection, Connection } from 'typeorm';


export async function getDbConnection() {

    const entities = [
        User
    ]

    const connection: Connection = await createConnection({
        type: "mongodb",
        url: "mongodb+srv://mahamud:SM&mongo123@cluster0-8tc2w.mongodb.net/test?retryWrites=true&w=majority",
        useNewUrlParser: true,
        database: "NodejsPOC",
        synchronize: true,
        logging: true,
        entities: entities
    });

    return connection;
}