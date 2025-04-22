'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ExperienceFormPage() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/homepagesignup'); // Redirect if token not found
    } else {
      setIsAuthenticated(true); // Allow access
    }
  }, [router]);

  const handleContinue = () => {
    alert(`Job Title: ${jobTitle}\nCompany: ${company}`);
  };

  if (!isAuthenticated) {
    return null; // Or show a loading spinner
  }

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row justify-center items-center p-6 gap-10">
      {/* Left: Form Section */}
      <div className="flex-1 max-w-xl">
        <h1 className="text-2xl font-bold mb-4">
          Enter a past job that shows relevant experience
        </h1>
        <p className="font-semibold text-gray-700 mb-2">
          Relevant experience <span className="text-gray-500 text-sm">(optional)</span>
        </p>

        <div className="border rounded-xl shadow px-6 py-4 space-y-6 bg-white">
          <div>
            <label htmlFor="jobTitle" className="block font-semibold mb-1">
              Job title
            </label>
            <input
              id="jobTitle"
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
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
        </div>

        <button
          onClick={handleContinue}
          className="mt-6 w-full bg-blue-700 text-white py-2 px-4 rounded font-semibold hover:bg-blue-800 transition"
        >
          Continue
        </button>
      </div>

      {/* Right: Job Description */}
      <div className="hidden lg:block flex-1 max-w-md bg-gray-50 border rounded-xl shadow p-6">
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

        <button className="text-blue-700 font-semibold mt-6 flex items-center gap-1">
          View full job description <span className="text-lg">▾</span>
        </button>
      </div>
    </div>
  );
}
