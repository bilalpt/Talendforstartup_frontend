'use client';

import { useState } from 'react';
import {
  Menu,
  X,
  Briefcase,
  Phone,
  Search,
  Users,
  Calendar,
  BarChart2,
  FolderPlus,
  Plus,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // ✅ Import Image from Next.js

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const route = useRouter();

  const navItems = [
    { icon: <Briefcase />, label: 'Jobs' },
    { icon: <Phone />, label: 'Phone Calls' },
    { icon: <Search />, label: 'Smart Sourcing' },
    { icon: <Users />, label: 'Candidates' },
    { icon: <Calendar />, label: 'Interviews' },
    { icon: <BarChart2 />, label: 'Analytics' },
    { icon: <FolderPlus />, label: 'Tools' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 ${
          isOpen ? 'w-60' : 'w-16'
        } p-4 flex flex-col`}
      >
        <button onClick={() => setIsOpen(!isOpen)} className="text-white mb-6">
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Create New Button */}
        <div className="w-full mb-6">
          <li
            className="flex items-center gap-3 px-3 py-2 rounded 
              bg-white text-black font-bold cursor-pointer hover:bg-gray-200 transition-all
              justify-start"
          >
            <span><Plus className="text-black" /></span>
            {isOpen && <span>Create New</span>}
          </li>
        </div>

        {/* Navigation Items */}
        <ul className="space-y-4 w-full">
          {navItems.map((item, i) => (
            <li
              key={i}
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 cursor-pointer 
                ${i === 0 ? 'bg-gray-700' : ''} justify-start`}
            >
              <span>{item.icon}</span>
              {isOpen && <span>{item.label}</span>}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-gray-100 p-6">
        {/* Header */}
        <header className="flex justify-between items-center ">
          <div>
            <h1 className="text-2xl font-semibold">Jobs</h1>
            <div className="mt-2">
              <button className="bg-gray-800 text-white px-4 py-1 rounded mr-2">All jobs</button>
              <button className="bg-gray-300 px-4 py-1 rounded">Tags</button>
            </div>
          </div>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>Help</span>
            <span>Notifications</span>
            <span>Messages</span>
            <span>bilalpt572@gmail.com</span>
          </div>
        </header>

        {/* Filters */}
        <section className="mb-6 flex flex-wrap items-center gap-4">
          <button className="bg-gray-200 px-4 py-1 rounded">Status</button>
          <button className="bg-gray-200 px-4 py-1 rounded">Title</button>
          <button className="bg-gray-200 px-4 py-1 rounded">Location</button>
          <button className="bg-gray-200 px-4 py-1 rounded">⭐</button>
          <button className="bg-blue-100 text-blue-600 px-4 py-1 rounded">1 filter applied</button>
          <span className="text-blue-600 font-medium">0 results</span>
        </section>

        {/* Empty State */}
        <section className="text-center">
          <div className="flex justify-center">
            {/* ✅ Optimized Image Component */}
            <Image
              src="/hrsideimages/laptopwithboy.svg"
              alt="Illustration"
              width={350}
              height={350}
              className="object-contain"
              priority
            />
          </div>
          <p className="text-lg font-semibold">
            Get up to 4x more applications. Post your first job directly on Indeed.
          </p>
          <p className="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
            Indeed Apply brings you up to four times more applications than redirecting applications to your career website. Make it simpler. Hire faster.
          </p>
          <button
            onClick={() => route.push('/hruserside/employeeaccountsecond')}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
          >
            Post a job
          </button>
        </section>
      </main>
    </div>
  );
}
