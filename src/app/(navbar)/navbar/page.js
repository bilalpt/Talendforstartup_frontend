"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  BellIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from 'next/image';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);

  // Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    console.log(token, 'token www');
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setDropdownOpen(false);
    window.location.href = "/homepagesignup"; // Redirect to sign up page
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 shadow-md bg-white relative">
      {/* Left Side - Logo and Links */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-700">
          <Image
            src="/logo/svglogo.svg"
            alt="Logo"
            width={150}
            height={80}
          />
        </Link>
        <div className="flex gap-6">
          <NavLink href="/employeeuserside/emplyeehomepage/employehome">Home</NavLink>
          <NavLink href="/employeeuserside/companyreviews">Company reviews</NavLink>
          <NavLink href="/salary-guide">Salary guide</NavLink>
        </div>
      </div>

      {/* Right Side - Auth & Dropdown */}
      <div className="flex items-center gap-4">
        {!isLoggedIn && (
          <NavLink href="/homepagesignup">Sign in</NavLink>
        )}

        <BellIcon className="w-6 h-6 text-gray-600 cursor-pointer" />

        {isLoggedIn && (
          <div className="relative" ref={dropdownRef}>
            <UserIcon
              className="w-6 h-6 text-gray-600 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border-gray-200 shadow-lg rounded-xl z-10 overflow-hidden">
                <Link
                  href="/employeeuserside/profile"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" />
                  </svg>
                  Profile
                </Link>
                <Link
                  href="/employeeuserside/myjobs"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-9 4h12a2 2 0 002-2V6a2 2 0 00-2-2H9l-2 2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  My Jobs
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m4.5-3h-9m9 0l-3-3m3 3l-3 3" />
                  </svg>
                  Log out
                </button>
              </div>
            )}
          </div>
        )}

        <span className="border-l h-6"></span>
        <Link href="/hruserside/postjob">
          <span className="text-blue-700 cursor-pointer">Employers / Post Job</span>
        </Link>
      </div>
    </nav>
  );
};

// NavLink with active underline
const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = mounted && pathname === href;

  return (
    <Link href={href} className="relative text-gray-700">
      {children}
      {isActive && <span className="block w-full h-[2px] bg-blue-700 mt-1"></span>}
    </Link>
  );
};

export default Navbar;
