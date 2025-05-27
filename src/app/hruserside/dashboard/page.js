'use client';

import { useState, useEffect } from 'react';
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
import Image from 'next/image';

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [tokenChecked, setTokenChecked] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const router = useRouter();

  // ✅ Token check
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');

    if (email) {
      setUserEmail(email);
    }
    if (!token) {
      router.push('/homepagesignup');
    } else {
      setTokenChecked(true);
    }
  }, [router]);

  if (!tokenChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Checking authentication...
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    // Redirect using router.push instead of window.location.href for SPA navigation
    router.push("/homepagesignup");
  };

  // ✅ Updated nav items with redirect paths and action for logout
  const navItems = [
    { icon: <Briefcase />, label: 'Posted Jobs', path: '/hruserside/jobformdetails' },
    { icon: <Users />, label: 'Candidates', path: '/hruserside/appliedcandidates' },
    { icon: <Phone />, label: 'Phone Calls', path: '/hruserside/phonecalls' },
    { icon: <Search />, label: 'Smart Sourcing', path: '/hruserside/smartsourcing' },
    { icon: <Calendar />, label: 'Interviews', path: '/hruserside/interviews' },
    { icon: <BarChart2 />, label: 'Back to User home', path: 'http://localhost:3000/' },
    { icon: <FolderPlus />, label: 'Log out', action: handleLogout },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 ${isOpen ? 'w-60' : 'w-16'
          } p-4 flex flex-col`}
      >
        <button onClick={() => setIsOpen(!isOpen)} className="text-white mb-6">
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Create New Button */}
        <div className="w-full mb-6">
          <div
            onClick={() => router.push('/hruserside/employeeaccountsecond')}
            className="flex items-center gap-3 px-3 py-2 rounded 
              bg-white text-black font-bold cursor-pointer hover:bg-gray-200 transition-all
              justify-start"
          >
            <Plus className="text-black" />
            {isOpen && <span>Create New</span>}
          </div>
        </div>

        {/* Navigation Items */}
        <ul className="space-y-4 w-full">
          {navItems.map((item, i) => (
            <li
              key={i}
              onClick={() => {
                if (item.action) {
                  item.action(); // Run logout function if present
                } else if (item.path) {
                  router.push(item.path);
                }
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 cursor-pointer 
                ${i === 0 ? 'bg-gray-700' : ''} justify-start`}
            >
              <span>{item.icon}</span>
              {isOpen && <span>{item.label}</span>}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <header className="flex justify-between items-center">
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
            <span>{userEmail}</span>
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
            Get up to 4x more applications. Post your first job directly on talent4startup.
          </p>
          <p className="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
            talent4startup Apply brings you up to four times more applications than redirecting applications
            to your career website. Make it simpler. Hire faster.
          </p>
          <button
            onClick={() => router.push('/hruserside/employeeaccountsecond')}
            className="mt-6 bg-[#CD0A1A] text-white px-6 py-2 rounded cursor-pointer"
          >
            Post a job
          </button>
        </section>
      </main>
    </div>
  );
}
