'use client';

import { useEffect, useState } from 'react';
import { FiMail, FiPhone } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import Navbar from '@/app/(navbar)/navbar/page';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [qualificationExists, setQualificationExists] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token) {
      router.push('/homepagesignup');
      return;
    }

    if (!userId) {
      console.error('No userId found in localStorage');
      return;
    }

    // Fetch user details
    fetch(`https://talent4startup.onrender.com/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch user data');
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch((err) => console.error(err));

    // Fetch resume (as PDF blob or JSON)
    fetch(`https://talent4startup.onrender.com/users/resume/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const json = await res.json();
          setResumeData(json.resume);
        } else if (contentType.includes('application/pdf')) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          setResumeData({
            name: 'Resume.pdf',
            url: url,
            added: 'Recently',
          });
        } else {
          console.warn('Unsupported content type:', contentType);
        }
      })
      .catch((err) => console.error('Error fetching resume:', err));

    // Fetch qualification data
    fetch(`https://talent4startup.onrender.com/users/user-qualification/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch qualification data');
        return res.json();
      })
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setQualificationExists(true);
        }
      })
      .catch((err) => console.error('Error fetching qualification:', err));
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F8F8] min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Profile Panel */}
        <div className="bg-white rounded-lg p-6 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-[#CD0A1A] text-white flex items-center justify-center text-3xl font-semibold mb-4 shadow">
              {user.name?.split(' ').map((n) => n[0]).join('')}
            </div>
            <h2 className="text-xl font-bold text-[#555454]">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-[#555454] mt-1">{user.address}</p>

            <div className="mt-4 space-y-2 text-sm text-[#555454] w-full">
              <div className="flex items-center gap-2">
                <FiMail className="text-[#CD0A1A]" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-[#CD0A1A]" />
                <span>{user.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:col-span-2 space-y-8">
          {/* Resume Section */}
          <div className="bg-white rounded-lg p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#555454]">Resume</h3>
            </div>
            <div className="flex items-center justify-between bg-[#F3F3F3] border p-4 rounded">
              <div className="flex items-center">
                <div className="w-12 h-14 bg-[#E2E2E2] flex flex-col items-center justify-center rounded mr-4">
                  <span className="text-xs bg-[#CD0A1A] text-white px-2 py-0.5 rounded">PDF</span>
                </div>
                <div>
                  <p className="font-medium text-[#555454]">
                    {resumeData?.name || 'No Resume Uploaded'}
                  </p>
                  <p className="text-sm text-[#888888]">
                    {resumeData?.added || 'N/A'}
                  </p>
                  {resumeData?.url && (
                    <a
                      href={resumeData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline mt-1 block"
                    >
                      View Resume
                    </a>
                  )}
                </div>
              </div>
              <BsThreeDots className="text-[#555454] text-xl cursor-pointer" />
            </div>
          </div>

          {/* Job Preferences */}
          <div className="bg-white rounded-lg p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-[#555454] mb-4">
              Improve Your Job Matches
            </h3>
            <div className="space-y-6">
              {[
                {
                  title: 'Qualifications',
                  description: qualificationExists
                    ? 'Edit your qualifications and experience.'
                    : 'Highlight your skills and experience.',
                  path: qualificationExists
                    ? 'qualificationform/editqualificationform'
                    : '/employeeuserside/qualificationform',
                },
                {
                  title: 'Job Preferences',
                  description: 'Include pay expectations and work type preferences.',
                  path: '/employeeuserside/jobpreferences',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  onClick={() => router.push(item.path)}
                  className="cursor-pointer group"
                >
                  <div className="pb-4 mb-4 border-b border-[#DDD] transition-colors group-hover:text-[#CD0A1A]">
                    <h4 className="font-medium text-[#555454] group-hover:text-[#CD0A1A]">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#777]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
