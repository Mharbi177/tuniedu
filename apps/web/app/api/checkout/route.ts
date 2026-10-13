import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { validateCheckout } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    // 1. Zod / Schema validation
    const validation = validateCheckout(rawBody);
    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: validation.error, details: validation.fieldErrors },
        { status: 400 }
      );
    }

    const { bookIds, paymentProvider, idempotencyKey } = validation.data;

    // 2. Resolve Authenticated User
    const userId = req.headers.get('x-user-id') || store.currentUserId;
    const user = store.users.find((u) => u.id === userId);
    if (!user) {
      return NextResponse.json({ error: 'Authentification requise pour commander.' }, { status: 401 });
    }

    // 3. Process Checkout with database price loading (SEC-04) and academic-year snapshot
    const result = store.processCheckout({
      userId: user.id,
      bookIds,
      paymentProvider,
      idempotencyKey,
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      purchaseId: result.purchase.id,
      totalMillimes: result.purchase.totalMillimes,
      currency: result.purchase.currency,
      entitlementsGranted: result.entitlements.map((e) => ({
        id: e.id,
        bookId: e.bookId,
        expiresAt: e.expiresAt,
        academicYearId: e.academicYearId,
      })),
      redirectUrl: `/student/library`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur serveur checkout' }, { status: 500 });
  }
}
