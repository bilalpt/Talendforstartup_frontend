'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const Employeeaccount = () => {
  const [countryCode, setCountryCode] = useState('+91');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-md">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Create Employer Account</h2>
          <p className="text-blue-600 text-sm font-medium cursor-pointer hover:underline">
            I’m looking for a job →
          </p>
        </div>

        {/* Image */}
        <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
          <Image
            src="/employer-hero.png"
            alt="Employer Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Form */}
        <form className="space-y-6">

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter company name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* How did you hear about us */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How did you hear about us?
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an option</option>
              <option>Google</option>
              <option>Friend</option>
              <option>Social Media</option>
              <option>Advertisement</option>
            </select>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <p className="text-xs text-gray-500 mb-2">
              For account-related communication. Not shown to jobseekers.
            </p>
            <div className="flex">
              <div className="flex items-center bg-gray-100 px-3 border border-gray-300 rounded-l-md text-sm">
                🇮🇳
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-transparent ml-1 focus:outline-none"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
              </div>
              <input
                type="tel"
                placeholder="62827-96425"
                className="w-full px-4 py-3 border-t border-b border-r border-gray-300 rounded-r-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300"
            >
              Continue →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Employeeaccount;
