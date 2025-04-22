'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import { Briefcase, MapPin, CalendarCheck } from 'lucide-react';
import Navbar from '@/app/(navbar)/navbar/page';

const jobs = [
  {
    id: 1,
    title: "Python Full Stack Developer",
    company: "Kiraj Traders Pvt Ltd",
    location: "Remote",
    appliedDate: "22 Nov 2024",
    status: "Job closed or expired on Indeed",
    badge: "Applied",
    description: {
      overview: "We are looking for a skilled Python Full Stack Developer to join our team and contribute to exciting web development projects.",
      responsibilities: [
        "Design and develop RESTful APIs using Django",
        "Implement responsive UIs with React and Tailwind CSS",
        "Collaborate with cross-functional teams for feature planning and delivery",
        "Optimize applications for maximum speed and scalability"
      ],
      requirements: [
        "Strong experience in Python and Django",
        "Proficiency in React.js and modern JavaScript (ES6+)",
        "Knowledge of PostgreSQL or MySQL",
        "Familiarity with Git and Agile development workflows"
      ],
      tools: ["Python", "Django", "React", "Tailwind CSS", "PostgreSQL", "Git", "Docker"]
    }
  },
  {
    id: 2,
    title: "Python Full Stack Developer",
    company: "Media wowfactor",
    location: "Quilandi, Kerala",
    appliedDate: "13 Nov 2024",
    status: "Job closed or expired on Indeed",
    badge: "Application viewed",
    description: {
      overview: "Join our growing tech team to build cutting-edge web solutions in a fast-paced, creative environment.",
      responsibilities: [
        "Create scalable backend services using Django",
        "Build dynamic frontend components with React",
        "Ensure cross-browser compatibility and responsiveness",
        "Participate in code reviews and agile sprints"
      ],
      requirements: [
        "Experience with Django and REST API development",
        "React.js skills with functional components and hooks",
        "Understanding of relational databases",
        "Version control experience with Git"
      ],
      tools: ["Python", "React", "Django", "Tailwind CSS", "Git", "MySQL"]
    }
  }
];

const JobDetail = () => {
  const params = useParams();
  const jobId = params?.id;
  const job = jobs.find(j => String(j.id) === jobId);

  if (!params?.id) {
    return <div className="text-center mt-10 text-yellow-600 text-lg">⏳ Loading...</div>;
  }

  if (!job) {
    return <div className="text-center mt-10 text-red-600 text-lg">🚫 Job not found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-[#CD0A1A] mb-2">{job.title}</h1>
            <div className="flex items-center text-gray-600 text-sm space-x-4">
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#CD0A1A]/10 border-l-4 border-[#CD0A1A] p-4 rounded">
              <p className="text-sm text-[#CD0A1A]">
                <strong>Status:</strong> {job.status}
              </p>
            </div>

            <div className="flex items-center text-gray-700 text-sm">
              <CalendarCheck className="w-4 h-4 mr-2" />
              Applied on: <span className="ml-1 font-medium">{job.appliedDate}</span>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold text-[#CD0A1A] mb-3">📝 Job Description</h2>
              <p className="text-gray-700 mb-5">{job.description.overview}</p>

              <div className="mb-5">
                <h3 className="font-medium text-[#CD0A1A] mb-2">🔧 Responsibilities</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {job.description.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="font-medium text-[#CD0A1A] mb-2">✅ Requirements</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {job.description.requirements.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="font-medium text-[#CD0A1A] mb-2">🛠 Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {job.description.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="bg-[#CD0A1A]/10 text-[#CD0A1A] text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
