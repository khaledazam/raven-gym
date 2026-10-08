import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const db = await getDatabase();
    const query: Record<string, unknown> = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      const searchRegex = { $regex: search.trim(), $options: 'i' };
      query.$or = [
        { fullName: searchRegex },
        { phone: searchRegex },
        { referenceCode: searchRegex },
        { senderAccount: searchRegex },
        { transactionRef: searchRegex },
      ];
    }

    const subscriptions = await db
      .collection('subscriptions')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    // Calculate live statistics
    const allRequests = await db.collection('subscriptions').find({}).toArray();
    const stats = {
      total: allRequests.length,
      pending: allRequests.filter((s) => s.status === 'pending').length,
      approved: allRequests.filter((s) => s.status === 'approved').length,
      rejected: allRequests.filter((s) => s.status === 'rejected').length,
      totalRevenue: allRequests
        .filter((s) => s.status === 'approved')
        .reduce((sum, s) => sum + (Number(s.amount) || 0), 0),
    };

    return NextResponse.json({
      success: true,
      subscriptions,
      stats,
    });
  } catch (error) {
    console.error('Error fetching admin subscriptions:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء جلب قائمة الاشتراكات.' },
      { status: 500 }
    );
  }
}
