// middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  console.log(token,'this is the middleware token');
  

  // If token doesn't exist, redirect to /homepagesignup
  if (!token) {
    return NextResponse.redirect(new URL('/homepagesignup', request.url));
  }

  // If token exists, allow access
  return NextResponse.next();
}

// List of protected routes (added your routes)
export const config = {
  matcher: [
    '/employeeuserside/profile',
    '/employeeuserside/qualificationform',
    '/employeeuserside/jobpreferences',
    '/employeeuserside/myjobs',
    '/hruserside/dashboard',
    '/hruserside/employeeaccountsecond',
    '/hruserside/jobformdetails',
    '/hruserside/jobsectionpage',
  ],
};
