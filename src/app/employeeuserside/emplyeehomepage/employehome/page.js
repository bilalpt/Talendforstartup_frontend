"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Bookmark, MoreVertical, X } from "lucide-react";
import Navbar from "@/app/(navbar)/navbar/page";
import { useRouter } from "next/navigation";

const EmployeHome = () => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobList, setJobList] = useState([]);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userApplications, setUserApplications] = useState([]);
  const [qualification, setQualification] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  console.log(jobList, 'this is hadhi');

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.warn("User ID not found in localStorage.");
    }
  }, []);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch("https://talent4startup.onrender.com/jobs");
        const data = await response.json();
        const filteredJobs = data.posts.filter((job) => job.recruiter !== userId);
        setJobList(filteredJobs);
        setSelectedJob(filteredJobs[0]);
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [userId]);

  useEffect(() => {
    const fetchApplicationsAndProfile = async () => {
      if (!userId) return;
      try {
        const appsRes = await fetch(`https://talent4startup.onrender.com/jobs/application/${userId}`);
        const appsData = await appsRes.json();
        setUserApplications(Array.isArray(appsData.applications) ? appsData.applications : []);

        const profileRes = await fetch(`https://talent4startup.onrender.com/users/user-qualification/${userId}`);
        const profileData = await profileRes.json();
        if (profileData?.data?._id) {
          setQualification(profileData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchApplicationsAndProfile();
  }, [userId]);

  const isJobApplied = useCallback(
    (jobId) => userApplications.some((app) => app.job === jobId || app?.job?._id === jobId),
    [userApplications]
  );

  const handleApply = async () => {
    if (!userId || !selectedJob) return;

    if (isJobApplied(selectedJob._id)) {
      alert("You have already applied for this job.");
      return;
    }

    try {
      const res = await fetch(`https://talent4startup.onrender.com/users/${userId}`);
      const userData = await res.json();

      if (userData?.user?.phone) {
        router.push(`/employeeuserside/applybuttonForms/cvpage?jobId=${selectedJob._id}`);
      } else {
        router.push(`/employeeuserside/applybuttonForms/contactform?jobId=${selectedJob._id}`);
      }
    } catch (error) {
      console.error("Error checking user phone:", error);
    }
  };

  const filteredJobs = jobList.filter((job) => {
    const searchMatch =
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase());

    const locationMatch =
      job.city.toLowerCase().includes(locationQuery.toLowerCase()) ||
      job.streetAddress.toLowerCase().includes(locationQuery.toLowerCase()) ||
      job.area.toLowerCase().includes(locationQuery.toLowerCase()) ||
      job.pincode?.toString().includes(locationQuery);

    return searchMatch && locationMatch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FA]">
      <Navbar />

      {/* Search Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 p-4">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-xl">
          <span className="text-[#CD0A1A] mr-2">🔍</span>
          <input
            type="text"
            placeholder="Find your perfect job"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none flex-1 text-[#555454]"
          />
        </div>
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full md:w-48">
          <span className="text-[#CD0A1A] mr-2">📍</span>
          <input
            type="text"
            placeholder="Location"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            className="bg-transparent outline-none flex-1 text-[#555454]"
          />
        </div>
      </div>

      {/* Job Section */}
      <div className="flex flex-col md:flex-row flex-grow p-4 gap-4 overflow-hidden shadow-2xl">
        {/* Job List */}
        <div className="w-full md:w-2/5 md:ml-40 overflow-y-auto overflow-x-hidden pr-2 relative">
          {currentJobs.length === 0 ? (
            <p className="text-center text-gray-500">No jobs found matching your search.</p>
          ) : (
            currentJobs.slice().reverse().map((job, index) => {
              const applied = isJobApplied(job._id);
              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedJob(job);
                    setMobileDetailOpen(true);
                  }}
                  className={`relative ml-8 mb-6 p-4 bg-white shadow-lg rounded-xl transition duration-300 cursor-pointer border-l-4 ${
                    selectedJob?._id === job._id ? "border-red-500" : "border-transparent"
                  } hover:shadow-xl`}
                >
                  <div className="flex justify-between items-start ">
                    <div>
                      <p className="font-semibold text-xl text-red-800">{job.jobTitle}</p>
                      <p className="font-bold text-[#555454] pt-3">{job.companyName}</p>
                      <p className="text-sm text-gray-600 pt-1">
                        {job.city} ({job.locationType})
                      </p>
                      <h2 className="pt-2 font-medium">Job Description</h2>
                      <p className="text-sm text-gray-600 pt-1 line-clamp-3">
                        {job.jobDescription}
                      </p>
                    </div>

                    <div className="text-sm text-gray-400 pr-6">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {applied && (
                    <span className="absolute bottom-3 right-4 text-green-600 text-xs font-semibold">
                      ✅ Already Applied
                    </span>
                  )}

                  <Bookmark className="absolute top-5 right-3 w-4 h-4 text-gray-400" />
                </div>
              );
            })
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-[#CD0A1A] text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Job Detail */}
        <div className="hidden md:block w-2/3 bg-[#ffffff] rounded-lg  p-6 overflow-y-auto mr-48  shadow-2xl">
          {selectedJob && (
            <>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mt-2 text-[#CD0A1A]">{selectedJob.jobTitle}</h2>
                  <p className="text-sm text-gray-600">Salary · ₹{selectedJob.salary}</p>
                </div>
                <div className="flex items-center gap-3 ">
                  <h2>{new Date(selectedJob.createdAt).toLocaleDateString()}</h2>
                  <MoreVertical className="text-gray-500" />
                  <Bookmark className="text-gray-500" />
                  {isJobApplied(selectedJob._id) ? (
                    <button className="px-4 py-2 rounded-md bg-gray-300 text-gray-500 cursor-not-allowed">
                      Already Applied
                    </button>
                  ) : qualification !== null ? (
                    <button onClick={handleApply} className="px-4 py-2 rounded-md bg-[#CD0A1A] text-white cursor-pointer">
                      Apply on employer site
                    </button>
                  ) : (
                    <button onClick={() => router.push('/employeeuserside/qualificationform')} className="px-4 py-2 rounded-md bg-[#CD0A1A] text-white cursor-pointer">
                      Apply on employer site
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-1 text-sm text-gray-700">
                <p><strong>Company :</strong> {selectedJob.companyName}</p>
                <p><strong>Location :</strong> {selectedJob.city} ({selectedJob.locationType})</p>
                <p><strong>Job Type :</strong> {selectedJob.jobType}</p>
                <p><strong>Salary:</strong> ₹{selectedJob.salary}</p>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-2 text-[#555454]">Company Description:</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {selectedJob.companyDescription || "No description available."}
                </p>
                <h3 className="font-semibold mb-2 text-[#555454] pt-4">Job Description:</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {selectedJob.jobDescription || "No description available."}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Mobile Job Detail */}
        {mobileDetailOpen && selectedJob && (
          <div className="md:hidden fixed inset-0 bg-white z-50 p-4 overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold mt-2 text-[#CD0A1A]">{selectedJob.jobTitle}</h2>
                <p className="text-sm text-gray-600">Salary : ₹{selectedJob.salary}</p>
              </div>
              <X className="text-gray-500 w-6 h-6 cursor-pointer" onClick={() => setMobileDetailOpen(false)} />
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p><strong>Company:</strong> {selectedJob.companyName}</p>
              <p><strong>Location:</strong> {selectedJob.city} ({selectedJob.locationType})</p>
              <p><strong>Salary:</strong> ₹{selectedJob.salary}</p>


              <div className="mt-4">
                <h3 className="font-semibold mb-2 text-[#555454]">Company Description:</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {selectedJob.companyDescription || "No description available."}
                </p>
              </div>


            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-[#555454]">Job Description:</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {selectedJob.jobDescription || "No description available."}
              </p>
            </div>

            <div className="mt-6">
              {isJobApplied(selectedJob._id) ? (
                <button className="w-full px-4 py-2 rounded-md bg-gray-300 text-gray-500 cursor-not-allowed">
                  Already Applied
                </button>
              ) : qualification !== null ? (
                <button onClick={handleApply} className="w-full px-4 py-2 rounded-md bg-[#CD0A1A] text-white ">
                  Apply on employer site
                </button>
              ) : (
                <button onClick={() => router.push('/employeeuserside/qualificationform')} className="w-full px-4 py-2 rounded-md bg-[#CD0A1A] text-white">
                  Apply on employer site
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeHome;
