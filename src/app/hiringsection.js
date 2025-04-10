'use client';

import Image from 'next/image';


export default function HiringSection() {
  return (
    <div className="flex flex-col items-center justify-between px-6 lg:px-56 py-16 bg-white">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full">
        <div className="max-w-lg text-center lg:text-left">
          <h1 className="text-4xl font-semibold text-gray-900">
            Let's hire your next great candidate. <span className="italic">Fast.</span>
          </h1>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            Post a free job*
          </button>
          <p className="mt-4 text-blue-600 text-sm">
            <a href="#" className="">
              *Terms, conditions, quality standards and usage limits apply.
            </a>
          </p>
        </div>
        <div>
          <Image src="/images/Resumeamico.svg"
            alt="Hiring Illustration" width={400} height={300} />
        </div>
      </div>

      {/* Steps Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-10">
        {[
          {
            step: '1',
            title: 'Create your free account',
            description: 'All you need is your email address to create an account and start building your job post.',
          },
          {
            step: '2',
            title: 'Build your job post',
            description: 'Then just add a title, description and location to your job post, and you\'re ready to go.',
          },
          {
            step: '3',
            title: 'Post your job',
            description: 'After you post your job, use our state-of-the-art tools to help you find dream talent.',
          },
        ].map(({ step, title, description }) => (
          <div key={step} className="p-6 border rounded-lg shadow-md bg-white text-center">
            <span className="text-blue-600 font-bold text-lg">{step}</span>
            <h2 className="text-xl font-semibold mt-2">{title}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
