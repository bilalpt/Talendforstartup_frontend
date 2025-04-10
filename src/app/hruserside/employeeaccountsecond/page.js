'use client';
import { useState } from 'react';

export default function JobBasicsForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription: '',
    jobTitle: '',
    jobDescription: '',
    salary: '',
    locationType: 'On-site',
    city: '',
    area: '',
    pincode: '',
    streetAddress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job Data:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-2xl rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Job Basics</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Eg: Rainbow Graphix Pvt Ltd"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Company Description */}
        <div>
          <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700">
            Company Description
          </label>
          <textarea
            id="companyDescription"
            name="companyDescription"
            value={formData.companyDescription}
            onChange={handleChange}
            placeholder="Introduce your company: business, culture, market position..."
            rows="4"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Job Title */}
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Job Description */}
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            placeholder="Describe the role and responsibilities..."
            rows="4"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Salary */}
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
            Salary (Per Month) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Eg: ₹30,000"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Location Type */}
        <div>
          <label htmlFor="locationType" className="block text-sm font-medium text-gray-700">
            Job Location Type <span className="text-red-500">*</span>
          </label>
          <select
            id="locationType"
            name="locationType"
            value={formData.locationType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
          >
            <option>On-site</option>
            <option>Remote</option>
            <option>Hybrid</option>
          </select>
        </div>

        {/* Address Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700">
              Area
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
