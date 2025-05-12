'use clint'
import Image from 'next/image';


export default function Addresume() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-lg w-full text-center">
          {/* Illustration */}
          <div className="mb-6">
            <Image
              src="/usersideimages/resumewithboy.svg"
              alt="Resume Illustration"
              className="mx-auto w-96 h-52"
            />
          </div>
  
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-4">Add your resume</h2>
  
          {/* Benefits List */}
          <ul className="text-gray-700 text-left space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span>✨</span>
              <span>Showcase your skills and let jobs and companies find you</span>
            </li>
            <li className="flex items-start gap-2">
              <span>🧳</span>
              <span>Easily apply to jobs and get hired faster</span>
            </li>
            <li className="flex items-start gap-2">
              <span>👥</span>
              <span>Get customised job suggestions</span>
            </li>
          </ul>
  
          {/* Agreement Text */}
          <p className="text-sm text-gray-500 mb-6">
            By continuing, you agree to receive job opportunities from Indeed.
          </p>
  
          {/* Upload Button */}
          <div className="flex justify-center mb-4">
            <button  className="border cursor-pointer bg-blue-500 text-white border-gray-300 py-2 px-4 rounded hover:bg-blue-800 transition">
              Upload Resume
            </button>
          </div>
  
          {/* Skip Link */}
          <a href="#" className="text-blue-700 text-sm hover:underline">
            Skip for now
          </a>
          
        </div>
      </div>
    );
  }
  