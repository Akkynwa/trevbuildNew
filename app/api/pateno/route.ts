import { NextResponse } from 'next/server';
import { pateno } from '@/lib/pateno';

export async function POST(req: Request) {
  try {
    const { amount, memo, category } = await req.json();

    // Create a professional memo for the bank records
    // Example: "DEPOSIT: Project #TB-2026"
    const professionalMemo = `${category.toUpperCase()}: ${memo}`;

    const result = await pateno.post('/v1/Payments/Process', {
      amount,
      memo: professionalMemo,
      currency: 'CAD'
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}