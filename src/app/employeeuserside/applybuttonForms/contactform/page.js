"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const router = useRouter();

  // Redirect if token is not found
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/homepagesignup");
    }
  }, [router]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center px-4 bg-gray-50">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 max-w-md p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Add your contact information</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">First name</label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="First name"
              defaultValue="bilal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last name</label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Last name"
              defaultValue="pt"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone number (optional)</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-100 text-sm">
                🇮🇳 +91
              </span>
              <input
                type="tel"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md"
                placeholder="Phone number"
                defaultValue="62827 96425"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Email"
              defaultValue="bilalpt572@gmail.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">City, State (optional)</label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="City, State"
              defaultValue="Calicut, Kerala"
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission
              router.push("/employeeuserside/applybuttonForms/cvpage");
            }}
            type="submit"
            className="w-full mt-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded cursor-pointer"
          >
            Continue
          </button>
        </form>
      </div>

      {/* Right Side - Job Info */}
      <div className="hidden md:block w-full md:w-1/2 max-w-md p-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold text-lg">Full Stack Developer</h3>
          <p className="text-sm text-gray-500 mb-2">Incerebrum - Bengaluru, Karnataka</p>
          <p className="text-sm text-gray-700">
            We are seeking a talented and motivated Fullstack Developer with expertise in React.js and JavaScript to join our dynamic development team. As a Fullstack Developer, you will play a key role in designing, developing, and maintaining our web applications...
          </p>
          <button className="text-blue-600 text-sm mt-2">View full job description</button>
        </div>
      </div>
    </div>
  );
}
