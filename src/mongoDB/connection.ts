import { Db, MongoClient } from 'mongodb';

const connStr = 'mongodb+srv://mahamud:SM&mongo123@cluster0-8tc2w.mongodb.net/test?retryWrites=true&w=majority';
const dbName = "NodejsPOC";

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
            console.error('An error occurred connecting to MongoDB: ', err);
            this.db = client.db(dbName);
            this.isConnected = true;
            return result(err, this.db);
        });
    }
}
