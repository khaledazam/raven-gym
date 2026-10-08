import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/mongodb';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'معرف الطلب غير صحيح.' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { status, adminNotes } = body;

    const allowedStatuses = ['pending', 'approved', 'rejected'];
    if (status && !allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'حالة الطلب غير صالحة.' },
        { status: 400 }
      );
    }

    const updateFields: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (status) {
      updateFields.status = status;
      updateFields.reviewedAt = new Date();
    }

    if (adminNotes !== undefined) {
      updateFields.adminNotes = adminNotes;
    }

    const db = await getDatabase();
    const result = await db
      .collection('subscriptions')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateFields },
        { returnDocument: 'after' }
      );

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'لم يتم العثور على الطلب.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'تم تحديث حالة الطلب بنجاح.',
      subscription: result,
    });
  } catch (error) {
    console.error('Error updating subscription status:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء تحديث حالة الطلب.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'معرف الطلب غير صالح.' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const result = await db.collection('subscriptions').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'الطلب غير موجود بالفعل.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'تم حذف الطلب بنجاح.',
    });
  } catch (error) {
    console.error('Error deleting subscription request:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء حذف الطلب.' },
      { status: 500 }
    );
  }
}
