'use client';

import React, { useState } from 'react';
import { SiGoogle } from 'react-icons/si';
import { FaComments, FaClipboardList, FaBuilding, FaMoneyBillWave } from 'react-icons/fa';
import Image from 'next/image';
import Navbar from '../(navbar)/navbar/page';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleEmailSubmit = async () => {
    if (!email) {
      setMessage('Please enter your email.');
      setStatus('error');
      return;
    }

    try {
      setStatus('loading');
      const response = await fetch('https://talent4startup.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, purpose: 'register' }),
      });

      const data = await response.json();
      console.log(data, 'this is email');

      if (response.ok) {
        setStatus('success');
        setMessage('OTP has been sent to your email.');
        setIsOtpSent(true); // OTP is sent, now show OTP form
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Server error or network failure.');
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp) {
      setMessage('Please enter the OTP.');
      setStatus('error');
      return;
    }

    try {
      setStatus('loading');
      const response = await fetch('https://talent4startup.onrender.com/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, purpose: 'register' }),
      });

      const data = await response.json();
      console.log(data, 'OTP response');

      if (response.ok) {
        // Save token
        localStorage.setItem('token', data.token );
        setStatus('success');
        setMessage('OTP verified successfully. Redirecting...');

        // Redirect to home page
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        setStatus('error');
        setMessage(data.message || 'Invalid OTP or something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Server error or network failure.');
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between px-4 py-10">
          {/* Left Illustration */}
          <div className="hidden md:block w-1/3">
            <Image src="/signuppage/searching.svg" alt="Search" width={300} height={300} />
          </div>

          {/* Form */}
          <div className="w-full md:w-1/3 text-center space-y-6">
            <h1 className="text-3xl font-bold text-green-600">Your work people are here</h1>
            <p className="text-sm text-gray-600">
              By continuing, you agree to our{' '}
              <a href="#" className="text-blue-600 underline">Terms of Use</a> and{' '}
              <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
            </p>

            <button className="w-full py-3 px-4 border border-gray-300 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-100">
              <SiGoogle className="w-5 h-5 text-red-500" />
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center justify-center text-gray-500">
              <span className="w-1/4 border-t" />
              <span className="mx-2">or</span>
              <span className="w-1/4 border-t" />
            </div>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus('idle');
                setMessage('');
              }}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              onClick={handleEmailSubmit}
              disabled={status === 'loading'}
              className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending OTP...' : 'Continue with email'}
            </button>

            {message && (
              <p className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}

            {isOtpSent && (
              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleOtpSubmit}
                  disabled={status === 'loading'}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 mt-4"
                >
                  {status === 'loading' ? 'Verifying OTP...' : 'Verify OTP'}
                </button>
              </div>
            )}
          </div>

          {/* Right Illustration */}
          <div className="hidden md:block w-1/3">
            <Image src="/signuppage/handshakingphoto.svg" alt="Handshake" width={300} height={300} />
          </div>
        </div>

        {/* Feature Section */}
        <section className="py-16 bg-white text-center w-full">
          <h2 className="text-2xl font-bold mb-4">Get ahead with Glassdoor</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-10">
            We're serving up trusted insights and anonymous conversation, so you'll have the goods you need to succeed.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-4">
            {[['Join your work community', <FaComments />],
              ['Find and apply to jobs', <FaClipboardList />],
              ['Search company reviews', <FaBuilding />],
              ['Compare salaries', <FaMoneyBillWave />]
            ].map(([label, icon], i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="border border-black rounded-full p-4 text-green-600">
                  {icon}
                </div>
                <p className="mt-4 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
