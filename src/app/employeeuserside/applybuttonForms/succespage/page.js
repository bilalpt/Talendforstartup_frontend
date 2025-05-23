'use client';
// pages/confirmation.tsx
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import searchingimg from '../../../../../public/savedjobs/searchingimg.svg'




export default function ConfirmationPage() {
    const router = useRouter();
    const handleClick = () => {
        router.push('/');
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8 text-center">
                <div className="flex justify-center mb-4">
                    <Image
                        src={searchingimg}
                        alt="Submitted"
                        className="h-28"
                    />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Your application has been submitted!
                </h2>
                <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-6 text-sm text-gray-700 flex items-center justify-center">
                    {/* <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    You will get an email confirmation at <strong className="ml-1">bilalpt572@gmail.com</strong> */}
                </div>
                <p className="font-semibold text-gray-700 mb-1">
                    Keep track of your applications
                </p>
                <p className="text-sm text-gray-500 mb-6">
                    To keep track of your applications, go to   MyJobs
                </p>
                <button
                    onClick={handleClick}
                    className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
                >
                    Return to job search
                </button>

            </div>
        </div>
    );
}