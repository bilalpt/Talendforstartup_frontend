'use client';
import React, { useState } from 'react';
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
  },
  {
    id: 3,
    title: "React Developer",
    company: "Tech Pulse",
    location: "Kozhikode, Kerala",
    appliedDate: "11 Nov 2024",
    status: "Under review",
    badge: "Applied"
  },
  {
    id: 4,
    title: "Frontend Engineer",
    company: "DesignCo",
    location: "Remote",
    appliedDate: "10 Nov 2024",
    status: "Shortlisted",
    badge: "Application viewed"
  },
  {
    id: 5,
    title: "Backend Developer",
    company: "DataNinja",
    location: "Bangalore",
    appliedDate: "8 Nov 2024",
    status: "Rejected",
    badge: "Applied"
  },
  {
    id: 6,
    title: "Full Stack Engineer",
    company: "WebWizards",
    location: "Cochin",
    appliedDate: "7 Nov 2024",
    status: "Under process",
    badge: "Applied"
  },
  {
    id: 7,
    title: "Junior Developer",
    company: "AppX Solutions",
    location: "Trivandrum",
    appliedDate: "5 Nov 2024",
    status: "Job closed",
    badge: "Applied"
  },
  {
    id: 8,
    title: "DevOps Engineer",
    company: "CloudCrew",
    location: "Remote",
    appliedDate: "4 Nov 2024",
    status: "In Review",
    badge: "Application viewed"
  },
  {
    id: 9,
    title: "Software Tester",
    company: "Bug Smashers",
    location: "Calicut",
    appliedDate: "2 Nov 2024",
    status: "Job closed",
    badge: "Applied"
  },
  {
    id: 10,
    title: "UI Designer",
    company: "Designify",
    location: "Kannur",
    appliedDate: "1 Nov 2024",
    status: "Viewed",
    badge: "Application viewed"
  },
  {
    id: 11,
    title: "Tech Intern",
    company: "Startup Hub",
    location: "Remote",
    appliedDate: "29 Oct 2024",
    status: "Job expired",
    badge: "Applied"
  },
  {
    id: 12,
    title: "System Analyst",
    company: "Bytecraft",
    location: "Chennai",
    appliedDate: "27 Oct 2024",
    status: "Rejected",
    badge: "Applied"
  }
];

const jobsPerPage = 6;

const MyJobs = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">My Jobs</h1>

        {currentJobs.map((job) => (
          <div
            key={job.id}
            onClick={() => router.push(`/employeeuserside/myjobs/${job.id}`)}
            className="border rounded-lg p-4 mb-4 shadow-sm cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`text-sm px-2 py-1 rounded-full font-medium 
                  ${
                    job.badge === "Applied"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {job.badge}
                </span>
                <h2 className="text-lg font-bold mt-2">{job.title}</h2>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-600 text-sm">{job.location}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Applied on {job.appliedDate}
                </p>
              </div>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg flex items-center">
                🚫 {job.status}
              </div>
            </div>
          </div>
        ))}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                currentPage === page
                  ? 'bg-[#CD0A1A] text-white border-[#CD0A1A]'
                  : 'text-[#CD0A1A] border-[#CD0A1A] hover:bg-[#CD0A1A]/10'
              } transition`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyJobs;
