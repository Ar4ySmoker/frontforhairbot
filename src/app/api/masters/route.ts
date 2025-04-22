// app/api/masters/route.ts
import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/db';
import { Master } from '@/app/lib/models';

export const GET = async () => {
  try {
    await connectToDB();
    const masters = await Master.find();

    return NextResponse.json({ success: true, masters });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
