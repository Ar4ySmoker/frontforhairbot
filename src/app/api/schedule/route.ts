import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/db';
import { Schedule } from '@/app/lib/models';

export const GET = async (req: Request) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const masterId = searchParams.get('masterId');
    const date = searchParams.get('date');

    if (!masterId || !date) {
      return NextResponse.json({ success: false, message: 'Missing masterId or date' }, { status: 400 });
    }

    const schedule = await Schedule.findOne({ masterId, date });
    return NextResponse.json({ success: true, slots: schedule?.slots || [] });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
