"use client";
import React, { useState } from "react";

const JobPreferencesForm = () => {
  const [jobTitle, setJobTitle] = useState("IT Engineer");
  const [minPay, setMinPay] = useState("400000");
  const [jobTypes, setJobTypes] = useState("");
  const [workSchedule, setWorkSchedule] = useState("");
  const [relocation, setRelocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      jobTitle,
      minPay,
      jobTypes,
      workSchedule,
      relocation,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto my-10 p-6 sm:p-10 bg-white border border-gray-200 shadow-xl rounded-xl"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Job preferences
      </h1>
      <p className="text-sm text-gray-600 mb-8">
        Sharing preferences helps connect you with relevant jobs and employers.
        <br />
        Except for pay, these may be shown to employers when you allow them to
        find your profile.
      </p>

      {/* Job Title */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-800 mb-2">
          👤 Job Title
        </label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {/* Minimum Base Pay */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-800 mb-2">
          💰 Minimum Base Pay (per year)
        </label>
        <input
          type="number"
          value={minPay}
          onChange={(e) => setMinPay(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {/* Job Types */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-800 mb-2">
          💼 Job Types
        </label>
        <input
          type="text"
          placeholder="E.g., Full-time, Part-time"
          value={jobTypes}
          onChange={(e) => setJobTypes(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {/* Work Schedule */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-800 mb-2">
          ⏰ Work Schedule
        </label>
        <input
          type="text"
          placeholder="E.g., Day shift, Flexible hours"
          value={workSchedule}
          onChange={(e) => setWorkSchedule(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {/* Relocation */}
      <div className="mb-8">
        <label className="block font-semibold text-gray-800 mb-2">
          📍 Relocation Preference
        </label>
        <input
          type="text"
          placeholder="E.g., Open to relocation, No relocation"
          value={relocation}
          onChange={(e) => setRelocation(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Save Preferences
      </button>
    </form>
  );
};

export default JobPreferencesForm;
