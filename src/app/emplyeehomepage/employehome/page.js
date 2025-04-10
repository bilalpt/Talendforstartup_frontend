"use client";

import React, { useState } from "react";
import { Bookmark, MoreVertical } from "lucide-react";
import Navbar from "@/app/(employee)/navbar/page";

const jobList = [
  {
    company: "Virtusa",
    rating: 3.7,
    role: "React Developer",
    location: "Bengaluru",
    salary: "₹6L – ₹8L (Glassdoor Est.)",
    posted: "12d",
    logo: "/virtusa.png",
    selected: true,
  },
  {
    company: "Aeolus Aero Tech Private Limited",
    role: "Front End Developer",
    location: "India",
    salary: "₹3L (Employer Est.)",
    posted: "2d",
    easyApply: true,
  },
  {
    company: "Nexia Digital",
    rating: 4.0,
    role: "ReactJS Developer",
    location: "Bengaluru",
    salary: "₹3L – ₹8L (Glassdoor Est.)",
    posted: "30d+",
    logo: "/nexia.png",
  },
  {
    company: "Metyis AG",
    rating: 3.6,
    role: "Frontend React Developer",
    location: "Bengaluru",
    logo: "/metyis.png",
  },
];

const EmployeHome = () => {
  const [selectedJob, setSelectedJob] = useState(jobList[0]);
  const [showMore, setShowMore] = useState(false);

  const extraDescription = `Loram 5 Tablet is a combination medicine used to treat hypertension (high blood pressure).
  It helps to control blood pressure when a single medication is not effective. It also helps to reduce the chances
  of any future heart attack and stroke. Loram 5 Tablet is a combination medicine used to treat hypertension (high blood pressure).
  It helps to control blood pressure when a single medication is not effective. It also helps to reduce the chances
  of any future heart attack and stroke. Loram 5 Tablet is a combination medicine used to treat hypertension (high blood pressure).
  It helps to control blood pressure when a single medication is not effective. It also helps to reduce the chances
  of any future heart attack and stroke.`;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar/>
      {/* Search Bar */}
      <div className="flex items-center justify-center gap-2 p-4">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-xl">
          <span className="text-gray-400 mr-2">🔍</span>
          <input
            type="text"
            placeholder="Find your perfect job"
            className="bg-transparent outline-none flex-1 text-gray-700"
          />
        </div>
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-48">
          <span className="text-gray-400 mr-2">📍</span>
          <input
            type="text"
            placeholder="Location"
            className="bg-transparent outline-none flex-1 text-gray-700"
          />
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-grow p-4 gap-4 overflow-hidden">
        {/* Left - Job List */}
        <div className="w-full md:w-1/3 md:ml-40 overflow-y-auto pr-2">
          {jobList.map((job, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedJob(job);
                setShowMore(false); // reset on job change
              }}
              className={`border rounded-lg p-4 cursor-pointer relative flex gap-3 transition h-48 ${
                selectedJob.company === job.company
                  ? "border-green-600 bg-white shadow"
                  : "bg-white"
              }`}
            >
              {job.logo && (
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-10 h-10 rounded self-start"
                />
              )}
              <div className="flex flex-col justify-between flex-grow overflow-hidden">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{job.company}</p>
                        {job.rating && <p className="text-sm">⭐ {job.rating}</p>}
                      </div>
                      <p className="font-bold">{job.role}</p>
                      <p className="text-sm text-gray-600">{job.location}</p>
                      <p className="text-sm text-gray-600">{job.salary}</p>
                    </div>
                    <div className="text-sm text-gray-400">{job.posted}</div>
                  </div>
                  {job.easyApply && (
                    <p className="text-green-600 text-sm mt-2 font-medium">⚡ Easy Apply</p>
                  )}
                </div>
              </div>
              <Bookmark className="absolute top-3 right-3 w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>

        {/* Right - Job Details */}
        <div className="hidden md:block w-2/3 bg-white rounded-lg shadow p-6 overflow-y-auto mr-48">
          {selectedJob && (
            <>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    {selectedJob.logo && (
                      <img
                        src={selectedJob.logo}
                        alt={selectedJob.company}
                        className="w-10 h-10 rounded"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{selectedJob.company}</p>
                      {selectedJob.rating && (
                        <p className="text-sm">⭐ {selectedJob.rating}</p>
                      )}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mt-2">{selectedJob.role}</h2>
                  <p className="text-sm text-gray-600">
                    {selectedJob.location} · {selectedJob.salary}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <MoreVertical className="text-gray-500" />
                  <Bookmark className="text-gray-500" />
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                    Apply on employer site
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Responsibilities:</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>Developing new user-facing features using React.js</li>
                  <li>Building reusable components and front-end libraries for future use</li>
                  <li>Translate User Stories and wireframes into high quality code</li>
                  <li>Create applications which provide fantastic UI/UX and responsive design</li>
                  <li>Integrate apps with third-party APIs and Cloud APIs</li>
                  <li>Apply core Computer Science concepts to improve consumer web apps</li>
                  <li>Profile and improve our frontend performance</li>
                  <li>Design for scalability and adherence to standards</li>
                </ul>

                {showMore && (
                  <p className="text-sm text-gray-700 mt-4 whitespace-pre-line">
                    {extraDescription}
                  </p>
                )}

                <p
                  className="text-green-700 mt-4 cursor-pointer font-semibold"
                  onClick={() => setShowMore((prev) => !prev)}
                >
                  {showMore ? "Show less ↑" : "Show more ↓"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeHome;
