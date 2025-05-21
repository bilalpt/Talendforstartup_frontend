"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/page';

const Appliedcandidates = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  console.log(jobs,'applicationsapplicationsapplications applicationsapplications applicationsapplicationsapplications');
  

  // Retrieve token and userId from localStorage (browser-only)
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (storedUserId && storedToken) {
      setUserId(storedUserId);
      setToken(storedToken);
    }
  }, []);

  // Fetch user's jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`https://talent4startup.onrender.com/jobs/recruiter/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (userId && token) fetchJobs();
  }, [userId, token]);

  // Fetch all job applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`https://talent4startup.onrender.com/jobs/application/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch applications');
        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (token) fetchApplications();
  }, [token]);

  return (
    <div className="flex">
      {/* Sidebar on the left */}
      <div className="w-1/4">
        <Sidebar />
      </div>

      {/* Main content on the right */}
      <div className="w-3/4 p-4 text-right">
        <h1 className="text-xl font-bold mb-4">Applied Candidates</h1>
        {error && <p className="text-red-500">{error}</p>}

        {/* User's posted jobs */}
        <div className="mb-6 text-left">
          <h2 className="text-lg font-semibold mb-2">Your Posted Jobs</h2>
          {jobs.length > 0 ? (
            <ul>
              {jobs.map((job) => (
                <li key={job._id} className="border-b py-2">
                  <strong>Job Title:</strong> {job.title}<br />
                  <strong>Applicants:</strong> {job.applicants?.length || 0}
                </li>
              ))}
            </ul>
          ) : (
            <p>No jobs found or no applicants.</p>
          )}
        </div>

        {/* All job applications */}
        <div className="text-left">
          <h2 className="text-lg font-semibold mb-2">All Applications</h2>
          {applications.length > 0 ? (
            <ul>
              {applications.map((app) => (
                <li key={app._id} className="border-b py-2">
                  <strong>Applicant:</strong> {app.candidate?.name || 'Unknown'}<br />
                  <strong>Job ID:</strong> {app.job}<br />
                  <strong>Status:</strong> {app.status || 'Pending'}
                </li>
              ))}
            </ul>
          ) : (
            <p>No applications found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appliedcandidates;
