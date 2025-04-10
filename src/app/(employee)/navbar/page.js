"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChatBubbleLeftRightIcon, BellIcon, UserIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-3 shadow-md bg-white">
      {/* Left Side - Logo and Links */}
      <div className="flex items-center gap-6">
        <Link href="/">
          <span className="text-2xl font-bold text-blue-700">indeed</span>
        </Link>
        <div className="flex gap-6">
          <NavLink href="/emplyeehomepage/employehome">Home</NavLink>
          <NavLink href="/companyreviews">Company reviews</NavLink>
          <NavLink href="/salary-guide">Salary guide</NavLink>
        </div>
      </div>

      {/* Right Side - Icons and Employers Link */}
      <div className="flex items-center gap-4">
      <NavLink href="/homepagesignup">Sign in</NavLink>
        {/* <ChatBubbleLeftRightIcon className="w-6 h-6 text-gray-600 cursor-pointer" /> */}
        <BellIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
        <UserIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
        <span className="border-l h-6"></span>
        <Link href="/hruserside/postjob">
          <span className="text-blue-700 cursor-pointer">Employers / Post Job</span>
        </Link>
      </div>
    </nav>
  );
};

// Hydration-safe NavLink component
const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering pathname-related stuff until mounted
  const isActive = mounted && pathname === href;

  return (
    <Link href={href} className="relative text-gray-700">
      {children}
      {isActive && (
        <span className="block w-full h-[2px] bg-blue-700 mt-1"></span>
      )}
    </Link>
  );
};

export default Navbar;
