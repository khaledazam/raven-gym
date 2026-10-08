import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    
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
