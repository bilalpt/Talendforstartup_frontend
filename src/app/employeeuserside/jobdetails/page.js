// app/employeeuserside/myjobs/[id]/page.tsx
'use client';
import { useParams } from 'next/navigation';
import React from 'react';
import Navbar from '@/app/(navbar)/navbar/page';

const jobs = [
  {
    id: 1,
    title: "Python Full Stack Developer",
    company: "Kiraj Traders Pvt Ltd",
    location: "Remote",
    appliedDate: "22 Nov 2024",
    status: "Job closed or expired on Indeed",
    badge: "Applied",
    description: "Worked on backend APIs, frontend with React, and database design."
  },
  {
    id: 2,
    title: "Python Full Stack Developer",
    company: "Media wowfactor",
    location: "Quilandi, Kerala",
    appliedDate: "13 Nov 2024",
    status: "Job closed or expired on Indeed",
    badge: "Application viewed",
    description: "Developed web applications with Django and integrated RESTful APIs."
  }
];

const JobDetail = () => {
  const params = useParams();
  const jobId = Number(params.id);
  const job = jobs.find(job => job.id === jobId);

  if (!job) {
    return <div className="text-center mt-10 text-red-600">Job not found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <p className="text-lg text-gray-700 mb-1">{job.company}</p>
        <p className="text-sm text-gray-500 mb-4">{job.location}</p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-800"><strong>Status:</strong> {job.status}</p>
          <p className="text-sm text-gray-800"><strong>Applied Date:</strong> {job.appliedDate}</p>
          <p className="mt-4 text-gray-700"><strong>Description:</strong><br />{job.description}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;

