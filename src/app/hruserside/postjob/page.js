'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/app/(navbar)/navbar/page';
import { useRouter } from 'next/navigation';

const Postjobnavigate = () => {
  const [checkLogedin, setcheckLogedin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setcheckLogedin(!!token);
  }, []);

  return (
    <div>
      <Navbar />
      <div
        className="flex flex-col items-center justify-between px-6 lg:px-56 py-16"
        style={{ backgroundColor: '#FDF3F4' }} // light background tint
      >
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full">
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-4xl font-semibold text-[#CD0A1A]">
              Let&rsquo;s hire your next great candidate.{' '}
              <span className="italic text-[#555454]">Fast.</span>
            </h1>
            <button
              onClick={() => {
                const token = localStorage.getItem('token');
                if (token) {
                  router.push('/hruserside/jobsectionpage');
                } else {
                  router.push('/homepagesignup');
                }
              }}
              className="mt-6 px-6 py-3 cursor-pointer bg-[#CD0A1A] text-white rounded-lg font-medium hover:bg-[#a50914]"
            >
              Post a free job*
            </button>
            <p className="mt-4 text-[#CD0A1A] text-sm">
              <a href="#">
                *Terms, conditions, quality standards and usage limits apply.
              </a>
            </p>
          </div>
          <div>
            <Image
              src="/images/Resumeamico.svg"
              alt="Hiring Illustration"
              width={400}
              height={300}
            />
          </div>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-10">
          {[
            {
              step: '1',
              title: 'Create your free account',
              description:
                'All you need is your email address to create an account and start building your job post.',
            },
            {
              step: '2',
              title: 'Build your job post',
              description:
                'Then just add a title, description and location to your job post, and you’re ready to go.',
            },
            {
              step: '3',
              title: 'Post your job',
              description:
                'After you post your job, use our state-of-the-art tools to help you find dream talent.',
            },
          ].map(({ step, title, description }) => (
            <div
              key={step}
              className="p-6 border rounded-lg shadow-md bg-white text-center border-[#CD0A1A]"
            >
              <span className="text-[#CD0A1A] font-bold text-lg">{step}</span>
              <h2 className="text-xl font-semibold mt-2 text-[#555454]">{title}</h2>
              <p className="text-[#555454] mt-2">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Postjobnavigate;
