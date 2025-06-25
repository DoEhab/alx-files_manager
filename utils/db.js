import mongodb from 'mongodb';
import envLoader from './env_loader.js';

class DBClient {
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.mongoClient = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.mongoClient.connect();
  }

  isAlive() {
    return this.mongoClient.isConnected();
  }

  async nbUsers() {
    return this.mongoClient.db().collection('users').countDocuments();
  }

  async nbFiles() {
    return this.mongoClient.db().collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
