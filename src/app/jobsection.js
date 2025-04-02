'use client';

import Image from 'next/image';
import Buildingcuate from '../app/images/Buildingcuate.svg'
import Jobhuntamico from '../app/images/Jobhuntamico.svg'

export default function JobSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 px-6 py-16 bg-gray-100">
      {/* Job Seeker Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-xs md:max-w-sm">
        <Image src={Jobhuntamico} alt="Looking for a job?" width={300} height={200} className="mx-auto" />
        <h2 className="text-xl font-semibold mt-4">Looking for a job?</h2>
        <button className="mt-4 px-6 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-100">
          Find jobs
        </button>
      </div>

      {/* Employer Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-xs md:max-w-sm">
        <Image src={Buildingcuate} alt="Hiring an employee?" width={300} height={200} className="mx-auto" />
        <h2 className="text-xl font-semibold mt-4">Hiring an employee?</h2>
        <button className="mt-4 px-6 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-100">
          Post a job
        </button>
      </div>
    </div>
  );
}
