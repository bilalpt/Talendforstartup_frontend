// /app/hruserside/jobformdetails/JobFormDetails.jsx
'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { SiGoogle, SiApple } from 'react-icons/si';
import { FaComments, FaClipboardList, FaBuilding, FaMoneyBillWave } from 'react-icons/fa';
import Navbar from '../(employee)/navbar/page';

export default function JobFormDetails() {
  const searchParams = useSearchParams(); // example usage

  return (
    <div>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-white">
        {/* Signup Section */}
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between px-4 py-10">
          {/* Left Illustration */}
          <div className="hidden md:block w-1/3">
            <Image src="/signuppage/searching.svg" alt="Left Illustration" width={300} height={300} />
          </div>

          {/* Center Form */}
          <div className="w-full md:w-1/3 text-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-green-600">
              Your work people are here
            </h1>
            <p className="text-sm text-gray-600">
              By continuing, you agree to our{' '}
              <a href="#" className="text-blue-600 underline">Terms of Use</a>{' '}
              and <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
            </p>

            {/* Google Button */}
            <button className="w-full py-3 px-4 border border-gray-300 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-100 cursor-pointer">
              <SiGoogle className="w-5 h-5 text-red-500" />
              <span>Continue with Google</span>
            </button>

            {/* Apple Button */}
            <button className="w-full py-3 px-4 border border-gray-300 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-100 cursor-pointer">
              <SiApple className="w-5 h-5 text-black" />
              <span>Continue with Apple</span>
            </button>

            {/* OR Divider */}
            <div className="flex items-center justify-center text-gray-500">
              <span className="w-1/4 border-t" />
              <span className="mx-2">or</span>
              <span className="w-1/4 border-t" />
            </div>

            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Continue with Email */}
            <button className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer">
              Continue with email
            </button>
          </div>

          {/* Right Illustration */}
          <div className="hidden md:block w-1/3">
            <Image src="/signuppage/handshakingphoto.svg" alt="Right Illustration" width={300} height={300} />
          </div>
        </div>

        {/* Bottom Features Section */}
        <section className="py-16 bg-white text-center w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Get ahead with Glassdoor
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-10">
            We&#39;re serving up trusted insights and anonymous conversation, so you&#39;ll have the goods you need to succeed.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-4">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
              <div className="border border-black rounded-full p-4">
                <FaComments className="w-8 h-8 text-green-600" />
              </div>
              <p className="mt-4 font-medium">Join your work community</p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center">
              <div className="border border-black rounded-full p-4">
                <FaClipboardList className="w-8 h-8 text-green-600" />
              </div>
              <p className="mt-4 font-medium">Find and apply to jobs</p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center">
              <div className="border border-black rounded-full p-4">
                <FaBuilding className="w-8 h-8 text-green-600" />
              </div>
              <p className="mt-4 font-medium">Search company reviews</p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center">
              <div className="border border-black rounded-full p-4">
                <FaMoneyBillWave className="w-8 h-8 text-green-600" />
              </div>
              <p className="mt-4 font-medium">Compare salaries</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
