'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

export default function JobPreferencesForm() {
  const router = useRouter(); // Initialize the router
  const [jobTitle, setJobTitle] = useState('IT Engineer');
  const [minPay, setMinPay] = useState('400000');
  const [jobTypes, setJobTypes] = useState('');
  const [workSchedule, setWorkSchedule] = useState('');
  const [relocation, setRelocation] = useState('');

  // useEffect to check token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (!token) {
      router.push('/homepagesignup'); // Redirect to signup page if no token is found
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      jobTitle,
      minPay,
      jobTypes,
      workSchedule,
      relocation,
    });
    alert('Preferences Saved! Check console for output.');
  };

  return (
    <section className="max-w-3xl mx-auto my-16 px-8 py-12 bg-white rounded-xl shadow-2xl">
      <h1 className="text-4xl font-bold text-[#CD0A1A] mb-6 text-center">
        Job Preferences
      </h1>
      <p className="text-lg text-[#555454] mb-10 text-center leading-relaxed">
        Help us match you with the best job opportunities by sharing your preferences. 
        These may be visible to employers if you choose to make your profile discoverable.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Row with two input fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormGroup label="Job Title" value={jobTitle} onChange={setJobTitle} />
          <FormGroup label="Minimum Base Pay (per year)" value={minPay} onChange={setMinPay} type="number" />
        </div>

        {/* Row with two input fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormGroup label="Preferred Job Types" value={jobTypes} onChange={setJobTypes} placeholder="E.g., Full-time, Part-time" />
          <FormGroup label="Work Schedule" value={workSchedule} onChange={setWorkSchedule} placeholder="E.g., Day shift, Flexible hours" />
        </div>

        {/* Single input field for relocation */}
        <FormGroup label="Relocation Preference" value={relocation} onChange={setRelocation} placeholder="E.g., Open to relocation, No relocation" />

        <div className="text-center pt-6">
          <button
            type="submit"
            className="bg-[#CD0A1A] hover:bg-[#A8081A] text-white font-semibold text-lg py-3 px-10 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </section>
  );
}

function FormGroup({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-[#555454] mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 px-4 py-2 border border-[#ccc] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CD0A1A] focus:border-[#CD0A1A] text-sm"
      />
    </div>
  );
}
