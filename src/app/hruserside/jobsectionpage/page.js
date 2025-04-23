'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function JobSection() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/homepagesignup');
    }
  }, []);

  return (
    <div className="h-screen flex flex-col md:flex-row items-center justify-center gap-6 px-6 py-16 bg-gray-100">
      {/* Job Seeker Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-xs md:max-w-sm">
        <Image src='/images/Jobhuntamico.svg' alt="Looking for a job?" width={300} height={200} className="mx-auto" />
        <h2 className="text-xl font-semibold mt-4">Looking for a job?</h2>
        <button
          onClick={() => router.push('/employeeuserside/emplyeehomepage/employehome')}
          className="mt-4 px-6 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-100"
        >
          Find jobs
        </button>
      </div>

      {/* Employer Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-xs md:max-w-sm">
        <Image src='/images/Buildingcuate.svg' alt="Hiring an employee?" width={300} height={200} className="mx-auto" />
        <h2 className="text-xl font-semibold mt-4">Hiring an employee?</h2>
        <button
          onClick={() => router.push('/hruserside/dashboard')}
          className="cursor-pointer mt-4 px-6 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-100"
        >
          Post a job
        </button>
      </div>
    </div>
  );
}
