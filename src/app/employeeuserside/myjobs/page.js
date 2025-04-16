'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/(navbar)/navbar/page';

const jobs = [
  {
    id: 1,
    title: "Python Full Stack Developer",
    company: "Kiraj Traders Pvt Ltd",
    location: "Remote",
    appliedDate: "22 Nov 2024",
    status: "Job closed or expired on Indeed",
    badge: "Applied"
  },
  {
    id: 2,
    title: "Python Full Stack Developer",
    company: "Media wowfactor",
    location: "Quilandi, Kerala",
    appliedDate: "13 Nov 2024",
    status: "Job closed or expired on Indeed",
    badge: "Application viewed"
  }
];

const MyJobs = () => {
  const router = useRouter();

  return (
    <div>
      <Navbar/>
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">My Jobs</h1>

      {jobs.map(job => (
        <div
          key={job.id}
          onClick={() => router.push(`/employeeuserside/myjobs/${job.id}`)}
          className="border rounded-lg p-4 mb-4 shadow-sm cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className={`text-sm px-2 py-1 rounded-full font-medium 
                ${job.badge === "Applied" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                {job.badge}
              </span>
              <h2 className="text-lg font-bold mt-2">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-600 text-sm">{job.location}</p>
              <p className="text-sm text-gray-500 mt-1">Applied on {job.appliedDate}</p>
            </div>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg flex items-center">
              🚫 {job.status}
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default MyJobs;
