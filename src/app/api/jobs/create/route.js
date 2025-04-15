// app/api/jobs/create/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  // Simulate saving to database or log it
  console.log('📝 Received Job Data:', body);

  return NextResponse.json({
    message: 'Job created successfully (no auth)',
    job: body,
  });
}
