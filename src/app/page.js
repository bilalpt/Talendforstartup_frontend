import Image from "next/image";
// 'use client';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import HiringSection from "./hiringsection";
import JobSection from "./jobsection";
import EmployerForm from "./employerform";
import Navbar from "./(employee)/navbar/page";
import AccountSelection from "./accountSelection";


export default function Home() {
  return (

    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
    //     {/* Logo */}
    //     <div className="flex justify-center mb-6">
    //       <h1 className="text-3xl font-semibold text-blue-600 mt-32">Talend For Start up</h1>
    //     </div>

    //     {/* Title & Description */}
    //     <h2 className="text-lg font-semibold text-gray-900 text-center">
    //       Ready to take the next step?
    //     </h2>
    //     <p className="text-gray-600 text-sm text-center mb-3">
    //       Create an account or sign in.
    //     </p>
    //     <p className="text-gray-500 text-xs text-center mb-4">
    //       By creating an account or signing in, you agree to Indeed’s{' '}
    //       <a href="#" className="text-blue-600">Terms</a>,{' '}
    //       <a href="#" className="text-blue-600">Cookie</a>, and{' '}
    //       <a href="#" className="text-blue-600">Privacy</a> policies.
    //     </p>

    //     {/* Google & Apple Sign-in */}
    //     <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md mb-2 hover:bg-gray-100">
    //       <FcGoogle className="mr-2" size={20} /> Continue with Google
    //     </button>
    //     <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md mb-4 hover:bg-gray-100">
    //       <FaApple className="mr-2" size={20} /> Continue with Apple
    //     </button>

    //     {/* Divider */}
    //     <div className="relative flex items-center mb-4">
    //       <div className="flex-grow border-t border-gray-300"></div>
    //       <span className="px-2 text-gray-400 text-sm">or</span>
    //       <div className="flex-grow border-t border-gray-300"></div>
    //     </div>

    //     {/* Email / Phone Input */}
    //     <label className="block text-sm font-medium text-gray-700 mb-1">
    //       Email address or phone number <span className="text-red-500">*</span>
    //     </label>
    //     <input
    //       type="text"
    //       placeholder="youremail@email.com "
    //       className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //     />

    //     {/* Continue Button */}
    //     <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
    //       Continue →
    //     </button>
    //   </div>
    //   <AccountSelection />
    // </div>



    <div>
        <div>
          <JobSection />
        </div>
        <div>
          <EmployerForm />
        </div>
      </div> 

  );
}
