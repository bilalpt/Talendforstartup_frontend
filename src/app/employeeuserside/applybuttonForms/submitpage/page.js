"use client";
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter , useSearchParams } from 'next/navigation';
import Image from 'next/image';


export default function SubmitPage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://talent4startup.onrender.com/users/${userId}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError('Failed to fetch user data.');
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId || !jobId) {
      alert("User ID or Job ID is missing.");
      return;
    }

    try {
      const response = await fetch("https://talent4startup.onrender.com/jobs/applys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, jobId }),        
        
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      // Navigate to success page
      router.push("/employeeuserside/applybuttonForms/succespage");
    } catch (err) {
      console.error(err);
      alert("Application submission failed. Please try again.");
    }
  };

  if (!userData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const resumeFilename = userData?.user?.resume?.filename;
  const resumeUrl = resumeFilename
    ? `https://talent4startup.onrender.com/uploads/${resumeFilename}`
    : null;

  return (
    <>
      <Head>
        <title>Application Review</title>
      </Head>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Please review your application</h2>

          <div className="space-y-6">
            {/* Contact Information */}
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">Contact information</h3>
                <button className="text-red-500 hover:underline text-sm cursor-pointer">Edit</button>
              </div>
              <div className="mt-2 space-y-2 text-gray-700">
                <div>
                  <p className="text-sm text-gray-500">Full name</p>
                  <p className="font-semibold">{userData.user.firstName} {userData.user.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email address</p>
                  <p className="font-semibold">{userData.user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">City, State</p>
                  <p className="font-semibold">{userData.user.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-semibold">{userData.user.phone}</p>
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">Job Details</h3>
                <button className="text-red-500 hover:underline text-sm cursor-pointer">Edit</button>
              </div>
              <div className="mt-2 space-y-2 text-gray-700">
                <div>
                  <p className="text-sm text-gray-500">Job Title</p>
                  <p className="font-semibold">{userData.user.experience.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-semibold">{userData.user.experience.company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration (in years)</p>
                  <p className="font-semibold">{userData.user.experience.years}</p>
                </div>
              </div>
            </div>

            {/* CV Upload */}
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">CV</h3>
                <button className="text-red-500 hover:underline text-sm cursor-pointer">Edit</button>
              </div>
              <div className="mt-2 bg-gray-100 p-3 rounded-md flex items-center gap-3">
                <div className="bg-white p-2 rounded shadow">
                  <Image
                    src="https://img.icons8.com/ios-filled/50/pdf.png"
                    alt="PDF Icon"
                    className="w-6 h-6"
                  />
                </div>
                <button className="text-red-700 font-medium text-sm hover:underline">CV</button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full mt-6 flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition duration-300 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
