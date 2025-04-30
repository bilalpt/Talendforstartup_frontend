'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; //import useSearchParams
import { ArrowUpTrayIcon, DocumentArrowUpIcon } from '@heroicons/react/24/solid';

export default function CVUploader() {
  const [cvFile, setCvFile] = useState(null);
  const [existingCv, setExistingCv] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token) {
      router.push('/homepagesignup');
    } else {
      setIsAuthenticated(true);

      if (userId) {
        fetch(`https://talent4startup.onrender.com/users/resume/${userId}`)
          .then((res) => {
            if (!res.ok) throw new Error('No previous CV found.');
            return res.blob();
          })
          .then((blob) => {
            const existingCvUrl = URL.createObjectURL(blob);
            setExistingCv(blob);
            setPreviewUrl(existingCvUrl);
          })
          .catch((err) => {
            console.log('No existing CV found:', err.message);
          });
      }
    }
  }, [router]);

  const handleCvUpload = (e) => {
    const file = e.target.files[0];
    setCvFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const fileToSubmit = cvFile || existingCv;

    if (!fileToSubmit) {
      alert('⚠️ Please upload your CV before submitting.');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('❌ User ID not found in local storage.');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('resume', fileToSubmit);

    try {
      const response = await fetch('https://talent4startup.onrender.com/users/user-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed. Please try again.');
      }

      alert('✅ CV Submitted successfully!');
      router.push('/employeeuserside/applybuttonForms/experienceform');
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-red-50 py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-red-800 mb-8 text-center">Upload Your CV</h1>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CV Upload */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100">
          <div className="mb-4">
            <label className="block text-lg font-medium text-red-700 mb-2">Upload PDF</label>
            <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-red-400 text-red-700 rounded-xl cursor-pointer bg-red-50 hover:bg-red-100 transition">
              <DocumentArrowUpIcon className="w-6 h-6" />
              <span className="font-medium">
                {cvFile ? cvFile.name : 'Choose File'}
              </span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleCvUpload}
                className="hidden"
              />
            </label>
          </div>

          {previewUrl && (
            <iframe
              src={previewUrl}
              className="w-full h-96 border rounded-xl mt-4"
              title="CV Preview"
            />
          )}
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100">
          <h2 className="text-2xl font-semibold text-red-800 mb-1">Full Stack Developer</h2>
          <p className="text-red-500 mb-4">Magenta EV Solutions Pvt. Ltd - Bangalore, Karnataka</p>

          <div className="text-sm text-slate-700 space-y-3">
            <p className="leading-relaxed">
              We’re looking for a passionate full-stack developer with experience building modern web applications.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Proficiency in JavaScript, React, and modern CSS frameworks.</li>
              <li>Experience with backend technologies like Node.js, Golang, or Python.</li>
              <li>Familiarity with REST APIs and databases.</li>
            </ul>
          </div>

          <button className="mt-6 text-red-600 hover:text-red-800 font-medium underline transition">
            View full job description
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-10 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition cursor-pointer"
      >
        <ArrowUpTrayIcon className="w-5 h-5 cursor-pointer" />
        Submit CV
      </button>
    </div>
  );
}
