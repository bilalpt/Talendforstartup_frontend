'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Calendar, MapPin, Trash2 } from 'lucide-react';
import Sidebar from '../sidebar/page';

export default function JobFormDetails() {
  const router = useRouter();

  const [expandedJobId, setExpandedJobId] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(appliedJobs.length / itemsPerPage);

  const currentJobs = appliedJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      router.push('/homepagesignup');
    } else {
      fetch(`https://talent4startup.onrender.com/jobs/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch job data');
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setAppliedJobs(data);
          } else if (Array.isArray(data.jobs)) {
            setAppliedJobs(data.jobs);
          } else {
            console.error('Unexpected response format:', data);
            setAppliedJobs([]);
          }
        })
        .catch((err) => {
          console.error('Error fetching jobs:', err);
        });
    }
  }, [router]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-500';
      case 'Interviewed':
        return 'bg-green-500';
      case 'Rejected':
        return 'bg-red-500';
      case 'Offered':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleDetails = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const handleDelete = (jobId) => {
    const updatedJobs = appliedJobs.filter((job) => job.id !== jobId);
    setAppliedJobs(updatedJobs);
  };

  const handleEdit = (job) => {
    console.log('Editing job:', job);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 lg:w-1/5 px-0 py-0  p-4 sticky top-0 h-screen hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-[#CD0A4A] mb-8 text-center">
            My Job Applications
          </h1>

          {currentJobs.length > 0 ? (
            <div className="space-y-6">
              {currentJobs.map((job, index) => (
                <div
                  key={job._id || `job-${index}`}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {job.jobTitle}
                      </h2>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                        <Briefcase className="w-4 h-4" />
                        {job.companyName}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.city}, {job.pincode}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Applied on {job.appliedDate || 'N/A'}
                      </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
                      <span
                        className={`text-sm font-semibold text-white px-4 py-1 rounded-full ${getStatusColor(
                          job.status
                        )}`}
                      >
                        {job.status || 'Pending'}
                      </span>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleDetails(job._id)}
                    className="mt-4 inline-block text-blue-600 hover:text-blue-800 transition-all"
                  >
                    {expandedJobId === job._id ? 'Hide Details' : 'Show Details'}
                  </button>

                  {expandedJobId === job._id && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Full Job Details
                      </h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>
                          <strong>Description:</strong> {job.jobDescription}
                        </li>
                        <li>
                          <strong>Company Description:</strong> {job.companyDescription}
                        </li>
                        <li><strong>Type:</strong> {job.jobType}</li>
                        <li><strong>Location Type:</strong> {job.locationType}</li>
                        <li><strong>Area:</strong> {job.area}</li>
                        <li><strong>Street Address:</strong> {job.streetAddress}</li>
                        <li><strong>Salary:</strong> ₹{job.salary}</li>
                      </ul>
                      <button
                        onClick={() => handleEdit(job)}
                        className="mt-4 text-blue-600 hover:text-blue-800 transition-all"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center text-lg">No jobs applied yet.</p>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 mx-1 bg-gray-300 rounded-md hover:bg-gray-400"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 mx-1 bg-gray-300 rounded-md hover:bg-gray-400"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
