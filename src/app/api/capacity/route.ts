import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('gym_management');
    
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    
    // Count active sessions (members)
    const activeMembersCount = await db.collection('sessions').countDocuments({
      status: 'active',
      checkInTime: { $gte: twoHoursAgo }
    });
    
    // Count used walk-ins (visits)
    const activeWalkinsCount = await db.collection('walkinsessions').countDocuments({
      status: 'used',
      usedAt: { $gte: twoHoursAgo }
    });
    
    const totalCapacity = activeMembersCount + activeWalkinsCount;

    return NextResponse.json({
      success: true,
      count: totalCapacity,
    });
  } catch (error) {
    console.error('Error fetching capacity:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
