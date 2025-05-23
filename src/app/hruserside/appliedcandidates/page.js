"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/page";

const Appliedcandidates = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCards, setExpandedCards] = useState({});
  const [loadingStatusUpdate, setLoadingStatusUpdate] = useState({});
  console.log(loadingStatusUpdate,'loadingStatusUpdateloadingStatusUpdateloadingStatusUpdateloadingStatusUpdateloadingStatusUpdate loadingStatusUpdate');
  

  const cardsPerPage = 4;

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");

    if (storedUserId && storedToken) {
      setUserId(storedUserId);
      setToken(storedToken);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !userId || !token) return;

    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `https://talent4startup.onrender.com/jobs/recruiter/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch jobs");

        const data = await response.json();

        if (Array.isArray(data)) {
          setJobs(data);
        } else if (Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        } else if (Array.isArray(data.applications)) {
          setJobs(data.applications);
        } else {
          setJobs([]);
          setError("Unexpected data format received from server.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchJobs();
  }, [hydrated, userId, token]);

  if (!hydrated) return null;

  const validStatuses = {
    Applied: "bg-yellow-100 text-yellow-800",
    Shortlisted: "bg-purple-100 text-purple-800",
    Rejected: "bg-red-100 text-red-800",
    Hired: "bg-green-100 text-green-800",
  };

  const toggleShowMore = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    setLoadingStatusUpdate((prev) => ({ ...prev, [applicationId]: true }));
    try {
      const response = await fetch(
        `https://talent4startup.onrender.com/jobs/application/status/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
          
        }
      );

      if (!response.ok) throw new Error("Failed to update status");

      setJobs((prevJobs) =>
        prevJobs.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      alert("Error updating status: " + err.message);
    } finally {
      setLoadingStatusUpdate((prev) => ({ ...prev, [applicationId]: false }));
    }
  };

  const totalPages = Math.ceil(jobs.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const selectedJobs = jobs.slice(startIndex, startIndex + cardsPerPage);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-8 w-3/4">
        <div className="max-w-5xl pr-28 mx-auto">
          <h1 className="text-2xl font-bold text-center text-[#CD0A4A] mb-10">
            Applied Candidates
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {jobs.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              No applications found.
            </p>
          ) : (
            <div className="space-y-8">
              {selectedJobs.map((application) => {
                const job = application.job || {};
                const user = application.user || {};
                const status = application.status || "Unknown";
                const isExpanded = expandedCards[application._id];

                return (
                  <div
                    key={application._id}
                    className="bg-white max-w-3xl mx-auto rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 p-6"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                          {job.jobTitle || "Job Title"}
                        </h2>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600 text-sm">
                          <p>
                            <strong>Candidate:</strong> {user.firstName} {user.lastName}
                          </p>
                          <p>
                            <strong>Email:</strong> {user.email}
                          </p>
                          <p>
                            <strong>Phone:</strong> {user.phone}
                          </p>
                          <p>
                            <strong>Address:</strong> {user.address}
                          </p>
                          <p className="sm:col-span-2">
                            <strong>Applied At:</strong>{" "}
                            {new Date(application.appliedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 items-start md:items-end">
                        <div>
                          <label className="text-sm font-semibold text-gray-700">
                            Status:
                          </label>
                          <select
                            className={`mt-1 px-2 py-1 rounded-md text-sm font-medium ${
                              validStatuses[status] || "bg-gray-100 text-gray-700"
                            }`}
                            value={status}
                            onChange={(e) =>
                              handleStatusChange(application._id, e.target.value)
                            }
                            disabled={loadingStatusUpdate[application._id]}
                          >
                            {Object.keys(validStatuses).map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                          onClick={() => alert("Delete functionality not implemented.")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Delete
                        </button>

                        <button
                          onClick={() => toggleShowMore(application._id)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          {isExpanded ? "Show Less" : "Show More"}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-6 text-gray-700 text-sm border-t pt-4 space-y-4">
                        <p>
                          <strong>Candidate Resume:</strong>{" "}
                          {user._id ? (
                            <a
                              href={`https://talent4startup.onrender.com/users/resume/${user._id}`}
                              className="text-blue-600 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Resume
                            </a>
                          ) : (
                            "Not uploaded"
                          )}
                        </p>

                        <div>
                          <strong>Candidate Experience:</strong>
                          {user.experience && typeof user.experience === "object" ? (
                            <div className="mt-1 ml-4">
                              {user.experience.title && (
                                <p>
                                  <strong>Title:</strong> {user.experience.title}
                                </p>
                              )}
                              {user.experience.company && (
                                <p>
                                  <strong>Company:</strong> {user.experience.company}
                                </p>
                              )}
                              {user.experience.years !== undefined && (
                                <p>
                                  <strong>Years:</strong> {user.experience.years}
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="ml-4">
                              {user.experience || "Not provided"}
                            </p>
                          )}
                        </div>

                        <div>
                          <strong>Candidate Qualification:</strong>
                          {user.qualification && typeof user.qualification === "object" ? (
                            <div className="mt-1 ml-4 space-y-2">
                              {user.qualification.cert && (
                                <div>
                                  <p>
                                    <strong>Certificate Name:</strong>{" "}
                                    {user.qualification.cert.name}
                                  </p>
                                  <p>
                                    <strong>Issued By:</strong>{" "}
                                    {user.qualification.cert.org}
                                  </p>
                                </div>
                              )}

                              {user.qualification.education && (
                                <div>
                                  <p>
                                    <strong>Degree:</strong>{" "}
                                    {user.qualification.education.degree}
                                  </p>
                                  <p>
                                    <strong>Institute:</strong>{" "}
                                    {user.qualification.education.institute}
                                  </p>
                                </div>
                              )}

                              <div>
                                <strong>Languages:</strong>{" "}
                                {(user.qualification.lang || []).join(", ")}
                              </div>

                              <div>
                                <strong>Skills:</strong>{" "}
                                {(user.qualification.skill || []).join(", ")}
                              </div>
                            </div>
                          ) : (
                            <p className="ml-4">
                              {user.qualification || "Not provided"}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Pagination controls */}
              <div className="mt-10 flex justify-center gap-4">
                <button
                  className="px-4 py-2 rounded-md bg-gray-200 text-sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 rounded-md bg-gray-200 text-sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appliedcandidates;
