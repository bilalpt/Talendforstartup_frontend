'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowUpTrayIcon, DocumentArrowUpIcon } from '@heroicons/react/24/solid';

export default function CVUploader() {
  const [cvFile, setCvFile] = useState(null);
  const [existingCv, setExistingCv] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [jobId, setJobId] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const param = searchParams.get('jobId');
    if (param) {
      setJobId(param);
    }

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

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [router, searchParams]);

  const handleCvUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file.');
      return;
    }

    setCvFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleModalConfirm = async () => {
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

      setShowSuccessModal(true);
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setIsModalOpen(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-red-50 py-12 px-4 sm:px-6 flex flex-col items-center relative">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <h1 className="text-4xl font-bold text-red-800 mb-8 text-center">Upload Your CV</h1>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100 col-span-1 lg:col-span-4">
          <div className="mb-4">
            <label className="block text-lg font-medium text-red-700 mb-2">Upload PDF</label>
            <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-red-400 text-red-700 rounded-xl cursor-pointer bg-red-50 hover:bg-red-100 transition">
              <DocumentArrowUpIcon className="w-6 h-6" />
              <span className="font-medium">{cvFile ? cvFile.name : 'Choose File'}</span>
              <input type="file" accept=".pdf" onChange={handleCvUpload} className="hidden" />
            </label>
          </div>

          {previewUrl ? (
            <div className="w-full mt-4 hidden sm:block">
              <iframe
                src={previewUrl}
                className="w-full h-[500px] border rounded-xl"
                title="CV Preview"
              />
            </div>
          ) : (
            <p className="text-center text-red-500 mt-4">No CV preview available. Please upload a PDF file.</p>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition cursor-pointer"
            >
              <ArrowUpTrayIcon className="w-5 h-5" />
              Submit CV
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100 col-span-1 lg:col-span-1">
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
        </div>
      </div>

      {previewUrl && (
        <div className="sm:hidden w-full mt-10 text-center px-4">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Your CV Preview</h2>
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-red-600 font-medium underline text-base"
          >
            📄 Tap here to view your CV
          </a>
          <p className="text-xs text-gray-500 mt-1">This link opens the PDF in a new tab.</p>
        </div>
      )}

      {/* Confirmation Modal with Blur */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full text-center shadow-2xl border border-red-100 animate-fade-in">
            <h3 className="text-xl font-semibold text-red-700 mb-4">Are you sure you want to submit?</h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleModalConfirm}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Yes
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal with Blur */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full text-center shadow-2xl border border-green-100 animate-fade-in">
            <div className="text-green-500 text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">CV Uploaded Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for uploading your resume. Click OK to continue to the experience form.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                router.push(`/employeeuserside/applybuttonForms/experienceform?jobId=${jobId}`);
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
