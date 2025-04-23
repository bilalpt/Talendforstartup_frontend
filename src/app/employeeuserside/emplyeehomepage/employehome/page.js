"use client";

import React, { useState, useEffect } from "react";
import { Bookmark, MoreVertical, X } from "lucide-react";
import Image from "next/image";
import Navbar from "@/app/(navbar)/navbar/page";
import { useRouter } from "next/navigation";

const EmployeHome = () => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobList, setJobList] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const extraDescription = `Loram 5 Tablet is a combination medicine used to treat hypertension (high blood pressure). It helps to control blood pressure when a single medication is not effective. It also helps to reduce the chances of any future heart attack and stroke.`;

  // Fetch job data from the API when the component mounts
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch("https://talent4startup.onrender.com/jobs");
        const data = await response.json();
        setJobList(data.posts); // Assuming the data is structured as { success: true, posts: [] }
        setSelectedJob(data.posts[0]); // Set the first job as the default selected job
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 p-4">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-xl">
          <span className="text-[#CD0A1A] mr-2">🔍</span>
          <input
            type="text"
            placeholder="Find your perfect job"
            className="bg-transparent outline-none flex-1 text-[#555454]"
          />
        </div>
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full md:w-48">
          <span className="text-[#CD0A1A] mr-2">📍</span>
          <input
            type="text"
            placeholder="Location"
            className="bg-transparent outline-none flex-1 text-[#555454]"
          />
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row flex-grow p-4 gap-4 overflow-hidden">
        {/* Left - Job List */}
        <div className="w-full md:w-1/3 md:ml-40 overflow-y-auto pr-2">
          {jobList.map((job, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedJob(job);
                setShowMore(false);
                setMobileDetailOpen(true);
              }}
              className={`border rounded-lg p-4 cursor-pointer relative flex gap-3 transition h-48 mb-4 ${
                selectedJob?._id === job._id
                  ? "border-[#CD0A1A] bg-white shadow"
                  : "bg-white"
              }`}
            >
              <div className="flex flex-col justify-between flex-grow overflow-hidden">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-[#555454]">{job.companyName}</p>
                      </div>
                      <p className="font-bold">{job.jobTitle}</p>
                      <p className="text-sm text-gray-600">{job.city}</p>
                      <p className="text-sm text-gray-600">{job.salary}</p>
                    </div>
                    <div className="text-sm text-gray-400">{new Date(job.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
              <Bookmark className="absolute top-3 right-3 w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>

        {/* Right - Job Details (Web View) */}
        <div className="hidden md:block w-2/3 bg-white rounded-lg shadow p-6 overflow-y-auto mr-48">
          {selectedJob && (
            <>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mt-2 text-[#CD0A1A]">{selectedJob.jobTitle}</h2>
                  <p className="text-sm text-gray-600">
                    {selectedJob.city} · {selectedJob.salary}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <MoreVertical className="text-gray-500" />
                  <Bookmark className="text-gray-500" />
                  <button
                    onClick={() =>
                      router.push("/employeeuserside/applybuttonForms/contactform")
                    }
                    className="bg-[#CD0A1A] text-white px-4 py-2 rounded-md cursor-pointer"
                  >
                    Apply on employer site
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-2 text-[#555454]">Responsibilities:</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>Developing new user-facing features using React.js</li>
                  <li>Building reusable components and front-end libraries</li>
                  <li>Translate wireframes into high quality code</li>
                  <li>Create responsive UI/UX</li>
                  <li>Integrate third-party APIs</li>
                  <li>Improve frontend performance</li>
                </ul>

                {showMore && (
                  <p className="text-sm text-gray-700 mt-4 whitespace-pre-line">
                    {extraDescription}
                  </p>
                )}

                <p
                  className="text-[#CD0A1A] mt-4 cursor-pointer font-semibold"
                  onClick={() => setShowMore((prev) => !prev)}
                >
                  {showMore ? "Show less ↑" : "Show more ↓"}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Mobile View Job Detail Overlay */}
        {mobileDetailOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-50 p-4 overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold mt-2 text-[#CD0A1A]">{selectedJob.jobTitle}</h2>
                <p className="text-sm text-gray-600">
                  {selectedJob.city} · {selectedJob.salary}
                </p>
              </div>
              <X
                className="text-gray-500 w-6 h-6"
                onClick={() => setMobileDetailOpen(false)}
              />
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2 text-[#555454]">Responsibilities:</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Developing new user-facing features using React.js</li>
                <li>Building reusable components and front-end libraries</li>
                <li>Translate wireframes into high quality code</li>
                <li>Create responsive UI/UX</li>
                <li>Integrate third-party APIs</li>
                <li>Improve frontend performance</li>
              </ul>

              {showMore && (
                <p className="text-sm text-gray-700 mt-4 whitespace-pre-line">
                  {extraDescription}
                </p>
              )}

              <p
                className="text-[#CD0A1A] mt-4 cursor-pointer font-semibold"
                onClick={() => setShowMore((prev) => !prev)}
              >
                {showMore ? "Show less ↑" : "Show more ↓"}
              </p>

              <button className="bg-[#CD0A1A] text-white mt-6 w-full py-2 rounded-md">
                Apply on employer site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeHome;
