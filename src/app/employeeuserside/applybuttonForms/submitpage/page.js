import Head from 'next/head';

export default function SubmitPage() {
  return (
    <>
      <Head>
        <title>Application Review</title>
      </Head>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Please review your application</h2>

          <div className="space-y-6">

            {/* Contact Information */}
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">Contact information</h3>
                <button className="text-red-500 hover:underline text-sm cursor-pointer">Edit</button>
              </div>
              <div className="mt-2 space-y-2 text-gray-700">
                <div>
                  <p className="text-sm text-gray-500">Full name</p>
                  <p className="font-semibold">bilal pt</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email address</p>
                  <p className="font-semibold">bilalpt572@gmail.com</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Your email address <em>may</em> be masked in accordance with Indeed’s Terms and Privacy Policy.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">City, State</p>
                  <p className="font-semibold">Calicut, Kerala</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-semibold">+91 62827 96425</p>
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">Job Details</h3>
                <button className="text-red-500 hover:underline text-sm cursor-pointer">Edit</button>
              </div>
              <div className="mt-2 space-y-2 text-gray-700">
                <div>
                  <p className="text-sm text-gray-500">Job Title</p>
                  <p className="font-semibold">Full Stack Developer</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-semibold">Rainbow Graphix</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration (in years)</p>
                  <p className="font-semibold">2 Years</p>
                </div>
              </div>
            </div>

            {/* CV Upload */}
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">CV</h3>
                <button className="text-red-500 hover:underline text-sm cursor-pointer">Edit</button>
              </div>
              <div className="mt-2 bg-gray-100 p-3 rounded-md flex items-center gap-3">
                <div className="bg-white p-2 rounded shadow">
                  <img src="https://img.icons8.com/ios-filled/50/pdf.png" alt="PDF Icon" className="w-6 h-6" />
                </div>
                <p className="text-red-700 font-medium text-sm">bilalpt (3) (1).pdf</p>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full mt-6 flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition duration-300 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
