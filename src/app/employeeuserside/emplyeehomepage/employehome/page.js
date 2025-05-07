"use client";

import React, { useState, useEffect } from "react";
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
        
        setJobList(data.posts);
        setSelectedJob(data.posts[0]);
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, []);

  useEffect(() => {
    const fetchApplicationsAndProfile = async () => {
      if (!userId) return;

      try {
        // Fetch applications
        const appsRes = await fetch(`https://talent4startup.onrender.com/jobs/application/${userId}`);
        const appsData = await appsRes.json();        
        setUserApplications(Array.isArray(appsData.applications) ? appsData.applications : []);

        // Fetch profile (qualification)
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

  const isJobApplied = (jobId) => {
    return userApplications.some((app) => app.job === jobId || app?.job?._id === jobId);
  };

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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />

      {/* Search Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 p-4">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-xl">
          <span className="text-[#CD0A1A] mr-2">🔍</span>
          <input type="text" placeholder="Find your perfect job" className="bg-transparent outline-none flex-1 text-[#555454]" />
        </div>
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full md:w-48">
          <span className="text-[#CD0A1A] mr-2">📍</span>
          <input type="text" placeholder="Location" className="bg-transparent outline-none flex-1 text-[#555454]" />
        </div>
      </div>

      {/* Job Section */}
      <div className="flex flex-col md:flex-row flex-grow p-4 gap-4 overflow-hidden">
        {/* Job List */}
        <div className="w-full md:w-1/3 md:ml-40 overflow-y-auto pr-2">
          {jobList.map((job, index) => {
            const applied = isJobApplied(job._id);
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedJob(job);
                  setMobileDetailOpen(true);
                }}
                className={`border rounded-lg p-4 cursor-pointer relative flex gap-3 transition h-auto mb-4 ${selectedJob?._id === job._id ? "border-[#CD0A1A] bg-white shadow" : "bg-white"
                  } ${applied ? "border-green-500" : ""}`}
              >
                <div className="flex flex-col justify-between flex-grow overflow-hidden">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-[#555454]">{job.companyName}</p>
                        </div>
                        <p className="font-bold">{job.jobTitle}</p>
                        <p className="text-sm text-gray-600">{job.city} ({job.locationType})</p>
                        <p className="text-sm text-gray-600">{job.streetAddress}</p>
                        <p className="text-sm text-gray-600">{job.area}</p>
                        <p className="text-sm text-gray-600">{job.pincode}</p>
                        <p className="text-sm text-gray-600">Salary: ₹{job.salary}</p>
                      </div>
                      <div className="text-sm text-gray-400">{new Date(job.createdAt).toLocaleDateString()}</div>
                    </div>
                    {applied && (
                      <span className="text-green-600 text-xs font-semibold mt-2 inline-block">
                        ✅ Already Applied
                      </span>
                    )}
                  </div>
                </div>
                <Bookmark className="absolute top-3 right-3 w-4 h-4 text-gray-400" />
              </div>
            );
          })}
        </div>

        {/* Desktop Detail View */}
        <div className="hidden md:block w-2/3 bg-white rounded-lg shadow p-6 overflow-y-auto mr-48">
          {selectedJob && (
            <>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mt-2 text-[#CD0A1A]">{selectedJob.jobTitle}</h2>
                  <p className="text-sm text-gray-600">{selectedJob.city} · ₹{selectedJob.salary}</p>
                </div>
                <div className="flex items-center gap-3">
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
                    
                  ):<button onClick={() => router.push('/employeeuserside/qualificationform')} className="px-4 py-2 rounded-md bg-[#CD0A1A] text-white cursor-pointer">
                    Apply on employer site 
                  </button> }
                </div>
              </div>

              <div className="mt-4 space-y-1 text-sm text-gray-700">
                <p><strong>Company:</strong> {selectedJob.companyName}</p>
                <p><strong>Location:</strong> {selectedJob.city} ({selectedJob.locationType})</p>
                <p><strong>Street:</strong> {selectedJob.streetAddress}</p>
                <p><strong>Salary:</strong> ₹{selectedJob.salary}</p>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-2 text-[#555454]">Job Description:</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {selectedJob.jobDescription || "No description available."}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Mobile Detail View */}
        {mobileDetailOpen && selectedJob && (
          <div className="md:hidden fixed inset-0 bg-white z-50 p-4 overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold mt-2 text-[#CD0A1A]">{selectedJob.jobTitle}</h2>
                <p className="text-sm text-gray-600">{selectedJob.city} · ₹{selectedJob.salary}</p>
              </div>
              <X className="text-gray-500 w-6 h-6" onClick={() => setMobileDetailOpen(false)} />
            </div>

            <div className="mt-4 space-y-1 text-sm text-gray-700">
              <p><strong>Company:</strong> {selectedJob.companyName}</p>
              <p><strong>Location:</strong> {selectedJob.city} ({selectedJob.locationType})</p>
              <p><strong>Street:</strong> {selectedJob.streetAddress}</p>
              <p><strong>Area:</strong> {selectedJob.area}</p>
              <p><strong>Pincode:</strong> {selectedJob.pincode}</p>
              <p><strong>Salary:</strong> ₹{selectedJob.salary}</p>
              {/* {qualification && <p><strong>Your Qualification:</strong> {qualification}</p>} */}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2 text-[#555454]">Job Description:</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {selectedJob.jobDescription || "No description available."}
              </p>

              {isJobApplied(selectedJob._id) ? (
                <button className="px-4 py-2 rounded-md bg-gray-300 text-gray-500 cursor-not-allowed">
                  Already Applied
                </button>
              ) : qualification !== null ? (
                <button
                  onClick={handleApply}
                  className="px-4 py-2 rounded-md bg-[#CD0A1A] text-white cursor-pointer"
                >
                  Apply on employer site 
                </button>
              ) : (
                <button
                  onClick={() => router.push('/employeeuserside/qualificationform')}
                  className="px-4 py-2 rounded-md bg-[#CD0A1A] text-white cursor-pointer"
                >
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
