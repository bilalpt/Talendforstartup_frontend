'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Navbar from '@/app/(navbar)/navbar/page';

const jobsPerPage = 6;

const MyJobs = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [jobList, setJobList] = useState([]);
  const [userApplications, setUserApplications] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(jobList,'jobListjobListjobListjobList jobList');
  console.log(userApplications,'userApplicationsuserApplicationsuserApplications userApplications ');
  
  

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
        setJobList(data.posts || []);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJobData();
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!userId) return;

      try {
        const appsRes = await fetch(`https://talent4startup.onrender.com/jobs/application/${userId}`);
        const appsData = await appsRes.json();        
        setUserApplications(Array.isArray(appsData.applications) ? appsData.applications : []);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userId]);

  // Combine userApplications with job details from jobList
  const appliedJobs = userApplications.map((application) => {
    const jobDetail = jobList.find(job => job._id === application.job);
    if (!jobDetail) return null;

    return {
      id: application._id,
      title: jobDetail.jobTitle,
      company: jobDetail.companyName,
      location: `${jobDetail.city}, ${jobDetail.pincode}`,
      appliedDate: new Date(application.appliedAt).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      }),
      status: "Under Review", // Default or dynamic if available
      badge: application.status || "Applied",
    };
  }).filter(Boolean); // remove nulls

  const totalPages = Math.ceil(appliedJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = appliedJobs.slice(indexOfFirstJob, indexOfLastJob);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">My Jobs</h1>

        {loading ? (
          <p>Loading jobs...</p>
        ) : currentJobs.length === 0 ? (
          <p>No jobs applied yet.</p>
        ) : (
          currentJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => router.push(`/employeeuserside/myjobs/${job.id}`)}
              className="border rounded-lg p-4 mb-4 shadow-sm cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className={`text-sm px-2 py-1 rounded-full font-medium 
                    ${job.badge === "Applied"
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
          ))
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border ${currentPage === page
                    ? 'bg-[#CD0A1A] text-white border-[#CD0A1A]'
                    : 'text-[#CD0A1A] border-[#CD0A1A] hover:bg-[#CD0A1A]/10'
                  } transition`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
