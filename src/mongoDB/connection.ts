import { Db, MongoClient } from 'mongodb';
import { config } from '../../config';

const connStr = config.CONNECTION_STRING;
const dbName = config.DATABASE;



export class MongoDBConnection {
    private static isConnected: boolean = false;
    private static db: Db;

    public static getConnection(result: (connection) => void) {
        if (this.isConnected) {
            return result(this.db);
        } else {
            this.connect((error, db: Db) => {
                return result(this.db);
            });
        }
    }

    private static connect(result: (error, db: Db) => void) {
        MongoClient.connect(connStr, { useNewUrlParser: true }, (err, client) => {
            this.db = client.db(dbName);
            this.isConnected = true;
            return result(err, this.db);
        });
    }
}
