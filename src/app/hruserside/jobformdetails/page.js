'use client';

import { useState } from 'react';
import { Briefcase, Calendar, MapPin, Trash2 } from 'lucide-react';

export default function JobFormDetails() {
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [editingJobId, setEditingJobId] = useState(null);
  const [editedJob, setEditedJob] = useState({});

  const [appliedJobs, setAppliedJobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Techie Solutions',
      location: 'Kochi, Kerala',
      appliedDate: 'April 20, 2025',
      status: 'Under Review',
      jobDescription:
        'As a Frontend Developer, you will be responsible for building the user interface for various web applications using React and JavaScript.',
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'CodeCraft Ltd.',
      location: 'Bangalore, Karnataka',
      appliedDate: 'April 18, 2025',
      status: 'Interview Scheduled',
      jobDescription:
        'As a Backend Developer, you will be responsible for building and maintaining the server-side logic of web applications, focusing on database management and API development.',
    },
    // Add more jobs as needed
  ]);

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = appliedJobs.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(appliedJobs.length / itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Review':
        return 'bg-yellow-500';
      case 'Interview Scheduled':
        return 'bg-blue-600';
      case 'Rejected':
        return 'bg-red-600';
      case 'Selected':
        return 'bg-green-600';
      default:
        return 'bg-gray-500';
    }
  };

  const toggleDetails = (id) => {
    setExpandedJobId(expandedJobId === id ? null : id);
    setEditingJobId(null);
  };

  const handleEdit = (job) => {
    setEditingJobId(job.id);
    setEditedJob({ ...job });
  };

  const handleSave = () => {
    const updatedJobs = appliedJobs.map((job) =>
      job.id === editedJob.id ? editedJob : job
    );
    setAppliedJobs(updatedJobs);
    setEditingJobId(null);
    setExpandedJobId(editedJob.id);
  };

  const handleDelete = (id) => {
    const updatedJobs = appliedJobs.filter((job) => job.id !== id);
    setAppliedJobs(updatedJobs);
    setExpandedJobId(null);
    if ((currentPage - 1) * itemsPerPage >= updatedJobs.length) {
      setCurrentPage(currentPage - 1 || 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedJob({ ...editedJob, [name]: value });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#CD0A4A] mb-8 text-center">
          My Job Applications
        </h1>

        {currentJobs.length > 0 ? (
          <div className="space-y-6">
            {currentJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {job.title}
                    </h2>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <Briefcase className="w-4 h-4" />
                      {job.company}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Applied on {job.appliedDate}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
                    <span
                      className={`text-sm font-semibold text-white px-4 py-1 rounded-full ${getStatusColor(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => toggleDetails(job.id)}
                  className="mt-4 inline-block text-blue-600 hover:text-blue-800 transition-all"
                >
                  {expandedJobId === job.id ? 'Hide Details' : 'Show Details'}
                </button>

                {expandedJobId === job.id && (
                  <div className="mt-4">
                    {editingJobId === job.id ? (
                      <div className="p-4 bg-gray-100 rounded-lg shadow-md space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600">
                            Job Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={editedJob.title}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">
                            Company Name
                          </label>
                          <input
                            type="text"
                            name="companyName"
                            value={editedJob.companyName || ''}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">
                            Company Description
                          </label>
                          <textarea
                            name="companyDescription"
                            value={editedJob.companyDescription || ''}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">
                            Salary
                          </label>
                          <input
                            type="text"
                            name="salary"
                            value={editedJob.salary || ''}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">
                            Location Type
                          </label>
                          <select
                            name="locationType"
                            value={editedJob.locationType || 'On-site'}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                          >
                            <option value="On-site">On-site</option>
                            <option value="Remote">Remote</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={editedJob.city || ''}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">
                            Area
                          </label>
                          <input
                            type="text"
                            name="area"
                            value={editedJob.area || ''}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">
                            Pincode
                          </label>
                          <input
                            type="text"
                            name="pincode"
                            value={editedJob.pincode || ''}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">
                            Street Address
                          </label>
                          <input
                            type="text"
                            name="streetAddress"
                            value={editedJob.streetAddress || ''}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">
                            Job Description
                          </label>
                          <textarea
                            name="jobDescription"
                            value={editedJob.jobDescription}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            rows={4}
                          />
                        </div>
                        <button
                          onClick={handleSave}
                          className="bg-green-600 text-white px-4 py-2 rounded-md"
                        >
                          Save Changes
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          Job Description
                        </h3>
                        <p className="text-sm text-gray-600">
                          {job.jobDescription}
                        </p>
                        <button
                          onClick={() => handleEdit(job)}
                          className="mt-4 text-blue-600 hover:text-blue-800 transition-all"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center text-lg">
            No jobs applied yet.
          </p>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 mx-1 bg-gray-300 rounded-md hover:bg-gray-400"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
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
  );
}
