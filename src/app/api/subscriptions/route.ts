import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

// Helper to generate a unique readable booking/subscription reference code
function generateReferenceCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = 'RVN-';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      phone,
      email = '',
      age = null,
      gender = 'male',
      goal = '',
      medicalNotes = '',
      planId,
      planName,
      durationMonths = 1,
      amount,
      paymentMethod = 'instapay',
      senderAccount,
      transactionRef = '',
      receiptImage = '',
    } = body;

    // Validate required fields
    if (!fullName || !phone || !planId || !amount || !senderAccount) {
      return NextResponse.json(
        {
          success: false,
          error: 'الرجاء إكمال كافة الحقول المطلوبة (الاسم، الهاتف، الباقة، واسم/رقم الحساب أو المحفظة المحول منها).',
        },
        { status: 400 }
      );
    }

    const isVodafoneCash = paymentMethod === 'vodafone_cash';
    const targetRecipient = isVodafoneCash ? '01036605024' : 'St pop10';

    const db = await getDatabase();
    const referenceCode = generateReferenceCode();

    const newSubscription = {
      referenceCode,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      age: age ? Number(age) : null,
      gender,
      goal,
      medicalNotes,
      planId,
      planName: planName || planId.toUpperCase(),
      durationMonths: Number(durationMonths) || 1,
      amount: Number(amount),
      currency: 'EGP',
      paymentMethod: isVodafoneCash ? 'vodafone_cash' : 'instapay',
      paymentTarget: targetRecipient,
      instapayTarget: targetRecipient, // backward compatibility
      senderAccount: senderAccount.trim(),
      transactionRef: transactionRef.trim(),
      receiptImage: receiptImage || null,
      status: 'pending', // 'pending' | 'approved' | 'rejected'
      adminNotes: '',
      reviewedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('subscriptions').insertOne(newSubscription);

    return NextResponse.json(
      {
        success: true,
        referenceCode,
        id: result.insertedId.toString(),
        message: 'تم إرسال طلب الاشتراك بنجاح وهو قيد المراجعة الآن من إدارة الجيم.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating subscription request:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'حدث خطأ في النظام أثناء معالجة الطلب. يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب.',
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');
    const reference = searchParams.get('reference');

    if (!phone && !reference) {
      return NextResponse.json(
        { success: false, error: 'يرجى تقديم رقم الهاتف أو رقم الطلب للاستعلام.' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const query: Record<string, unknown> = {};
    if (phone) query.phone = phone.trim();
    if (reference) query.referenceCode = reference.trim().toUpperCase();

    const subscription = await db.collection('subscriptions').findOne(query, {
      sort: { createdAt: -1 },
    });

    if (!subscription) {
      return NextResponse.json(
        { success: false, error: 'لم يتم العثور على طلب بهذا الرقم.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      subscription,
    });
  } catch (error) {
    console.error('Error querying subscription:', error);
    return NextResponse.json(
      { success: false, error: 'خطأ أثناء جلب بيانات الطلب.' },
      { status: 500 }
    );
  }
}
