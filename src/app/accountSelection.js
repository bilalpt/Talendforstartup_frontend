"use client";

import { useState } from "react";

export default function AccountSelection() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h1 className="text-center text-2xl font-semibold text-blue-700 mb-4">indeed</h1>
        <h2 className="text-lg font-semibold mb-3">What kind of account do you need? <span className="text-red-500">*</span></h2>

        <div className="space-y-3">
          {/* Jobseeker Option */}
          <label className={`flex items-center border rounded-lg p-3 cursor-pointer ${selected === "jobseeker" ? "border-blue-500" : "border-gray-300"}`}>
            <input 
              type="radio" 
              name="accountType" 
              className="hidden"
              onChange={() => setSelected("jobseeker")} 
            />
            <img src="https://via.placeholder.com/50" alt="Jobseeker" className="w-12 h-12 rounded-md mr-3"/>
            <div>
              <span className="font-semibold">Jobseeker</span>
              <p className="text-gray-500 text-sm">I am looking for a job</p>
            </div>
          </label>

          {/* Employer Option */}
          <label className={`flex items-center border rounded-lg p-3 cursor-pointer ${selected === "employer" ? "border-blue-500" : "border-gray-300"}`}>
            <input 
              type="radio" 
              name="accountType" 
              className="hidden"
              onChange={() => setSelected("employer")} 
            />
            <img src="https://via.placeholder.com/50" alt="Employer" className="w-12 h-12 rounded-md mr-3"/>
            <div>
              <span className="font-semibold">Employer</span>
              <p className="text-gray-500 text-sm">I am looking for candidates</p>
            </div>
          </label>
        </div>

        {/* Continue Button */}
        <button 
          className={`w-full mt-4 py-2 rounded-lg text-white font-semibold ${selected ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
          disabled={!selected}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
