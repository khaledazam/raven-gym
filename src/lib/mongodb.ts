import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const options = { serverSelectionTimeoutMS: 10000 };

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) throw new Error('Database connection is not configured');
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch(async error => {
      global._mongoClientPromise = undefined;
      await client.close().catch(() => {});
      throw error;
    });
  }
  return global._mongoClientPromise;
}

export async function getDatabase(dbName = 'gym_management'): Promise<Db> {
  const connectedClient = await getClientPromise();
  return connectedClient.db(dbName);
}

export default getClientPromise;
