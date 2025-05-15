'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/(navbar)/navbar/page';
import searchingimg from '../../../../public/savedjobs/searchingimg.svg'
import Image from 'next/image';


const Savedjobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        // Simulate fetching saved jobs from localStorage or API
        const jobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
        setSavedJobs(jobs);
    }, []);

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
<p className="text-2xl font-bold text-[#CD0A1A]">Saved Jobs</p>
                {savedJobs.length === 0 ? (
                    <div className="text-center text-gray-600 mt-10">
                        <Image src={searchingimg} alt="No saved jobs" width={350} height={200} className="mx-auto mb-4" />
                        <p>You haven’t saved any jobs yet.</p>
                        <p className="text-sm mt-2">Start exploring and save jobs you’re interested in!</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {savedJobs.map((job, index) => (
                            <div key={index} className="border p-4 rounded-md shadow-sm hover:shadow-md transition">
                                <h2 className="text-xl font-semibold">{job.title}</h2>
                                <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                                <button className="mt-2 text-blue-600 hover:underline">View Details</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Savedjobs;
