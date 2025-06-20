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

export default function Sidebar() {
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



    // ✅ Updated nav items with redirect paths
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
                                if (item.path) {
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
        </div>
    )
}
