// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  return NextResponse.next();
}

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







