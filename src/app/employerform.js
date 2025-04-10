"use client"; // ✅ Add this at the top
import { useState } from "react";

export default function EmployerForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    fullName: "",
    referralSource: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Create an employer account</h2>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Company name *</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">First and last name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">How did you hear about us?</label>
            <select
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an option</option>
              <option value="social-media">Social Media</option>
              <option value="friend">Friend</option>
              <option value="ad">Advertisement</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Phone number</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="bg-gray-200 px-4 py-2">🇮🇳 +91</span>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 focus:outline-none"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              For account management communication. Not visible to jobseekers.
            </p>
          </div>
          {/* Buttons Section */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              <span className="mr-2">⬅</span> I&apos;m looking for a job
            </button>
            <button
              type="submit"
              className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Continue <span className="ml-2">➡</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
