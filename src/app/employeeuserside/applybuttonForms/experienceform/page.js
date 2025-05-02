'use client';
import { useEffect, useState } from 'react';
import { useRouter,useSearchParams } from 'next/navigation'; // or 'next/router' if using pages directory

export default function ExperienceFormPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [years, setYears] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');

  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  

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
      userId: userId,
      title: title,
      company: company,
      years: years,
    };

    try {
      const response = await fetch('https://talent4startup.onrender.com/users/user-experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data, 'this is the response');

      if (response.ok) {
        alert('Experience submitted successfully!');
        router.push(`/employeeuserside/applybuttonForms/submitpage?jobId=${jobId}`); // ✅ Redirect after success
      } else {
        alert('Error: ' + (data.message || 'Something went wrong'));
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row justify-center items-center p-6 gap-10">
      <div className="flex-1 max-w-xl">
        <h1 className="text-2xl font-bold mb-4">
          Enter a past job that shows relevant experience
        </h1>
        <p className="font-semibold text-gray-700 mb-2">
          Relevant experience <span className="text-gray-500 text-sm">(optional)</span>
        </p>

        <div className="border rounded-xl shadow px-6 py-4 space-y-6 bg-white">
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
        </div>

        <button
          onClick={handleContinue}
          className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded font-semibold hover:bg-red-700 transition"
        >
          Continue
        </button>
      </div>

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
