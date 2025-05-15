'use client'; // Ensure this is a client component

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ExperienceFormClient() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [years, setYears] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');

  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');
  console.log(jobId,'this is the jobid hello');
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    if (!token || !storedUserId) {
      router.push('/homepagesignup');
    } else {
      setIsAuthenticated(true);
      setUserId(storedUserId);
    }
  }, [router]);

  const handleContinue = async () => {
    if (!title || !company || !years) {
      alert('Please fill in all the required fields');
      return;
    }

    const payload = {
      userId,
      title,
      company,
      years,
    };

    try {
      const response = await fetch('https://talent4startup.onrender.com/users/user-experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Experience submitted successfully!');
        router.push(`/employeeuserside/applybuttonForms/submitpage?jobId=${jobId}`);
      } else {
        alert('Error: ' + (data.message || 'Something went wrong'));
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white flex flex-col lg:flex-row justify-center items-center p-6 gap-10"
    >
      {/* Left form section */}
      <div className="flex-1 max-w-xl w-full">
        <h1 className=" font-bold mb-4">
          Enter a past job that shows relevant experience
        </h1>
        <p className="font-semibold text-gray-700 mb-2">
          Relevant experience <span className="text-gray-500 text-sm">(optional)</span>
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border rounded-xl shadow px-6 py-4 space-y-6 bg-white"
        >
          <div>
            <label htmlFor="title" className="block font-semibold mb-1">
              Job title
            </label>
            <input
              id="title"
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="company" className="block font-semibold mb-1">
              Company
            </label>
            <input
              id="company"
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="years" className="block font-semibold mb-1">
              Duration (in years)
            </label>
            <input
              id="years"
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g., 2 years"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          </div>
        </motion.div>

        <button
          onClick={handleContinue}
          className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded font-semibold hover:bg-red-700 transition cursor-pointer"
        >
          Continue
        </button>
      </div>

      {/* Right job preview section */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="hidden lg:block flex-1 max-w-md bg-gray-50 border rounded-xl shadow p-6"
      >
        <h2 className="font-bold text-lg mb-1">Full Stack Developer</h2>
        <p className="text-gray-600 mb-4 text-sm">
          Magenta EV Solutions Pvt. Ltd - Bangalore, Karnataka
        </p>
        <hr className="mb-4" />
        <ul className="list-disc pl-5 text-gray-800 space-y-2 text-sm">
          <li>
            Expertise in front-end technologies, including JavaScript, CSS3, and HTML5, and third-party libraries such as React Js, Angular, jQuery, and LESS
          </li>
          <li>
            Developing back-end website applications using server-side programming languages, including Java, Golang, Node, and Python
          </li>
        </ul>
        <button className="text-blue-700 font-semibold mt-6 flex items-center gap-1 cursor-pointer">
          View full job description <span className="text-lg">▾</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
