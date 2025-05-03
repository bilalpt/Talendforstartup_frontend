'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function JobPreferencesForm() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState('IT Engineer');
  const [minPay, setMinPay] = useState('400000');
  const [jobTypes, setJobTypes] = useState('');
  const [workSchedule, setWorkSchedule] = useState('');
  const [relocation, setRelocation] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      router.push('/homepagesignup');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      alert('User not authenticated.');
      return;
    }

    const payload = {
      userId,
      jobTitle,
      minPay,
      jobTypes,
      workSchedule,
      relocation,
    };

    try {
      const response = await fetch('https://talent4startup.onrender.com/users/user-job-pref', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save preferences.');
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('Preferences saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while saving preferences.');
    }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormGroup label="Job Title" value={jobTitle} onChange={setJobTitle} />
          <FormGroup
            label="Minimum Base Pay (per year)"
            value={minPay}
            onChange={setMinPay}
            type="number"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormGroup
            label="Preferred Job Types"
            value={jobTypes}
            onChange={setJobTypes}
            placeholder="E.g., Full-time, Part-time"
          />
          <FormGroup
            label="Work Schedule"
            value={workSchedule}
            onChange={setWorkSchedule}
            placeholder="E.g., Day shift, Flexible hours"
          />
        </div>

        <FormGroup
          label="Relocation Preference"
          value={relocation}
          onChange={setRelocation}
          placeholder="E.g., Open to relocation, No relocation"
        />

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
      <label className="block text-sm font-medium text-[#555454] mb-1">
        {label}
      </label>
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
