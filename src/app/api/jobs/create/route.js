// app/api/jobs/create/route.js
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function POST(req) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Missing or invalid token' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const user = verifyToken(token);

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized or invalid token' }, { status: 403 });
  }

  const body = await req.json();

  console.log('📝 Authenticated job post from:', user.email); // token should include email
  console.log('📄 Job Data:', body);

  return NextResponse.json({
    message: '✅ Job created successfully (protected)',
    job: body,
    createdBy: user.email,
  });
}
