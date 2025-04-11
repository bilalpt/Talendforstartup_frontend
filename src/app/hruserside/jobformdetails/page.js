// 'use client';

// import { useSearchParams, useRouter } from 'next/navigation';
// import { PencilIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

// export default function JobFormDetails() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const getValue = (key) => searchParams.get(key) || 'N/A';

//   const handleEdit = () => router.push('/job-form');
//   const handleNext = () => router.push('/review');

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-10 mt-14 shadow-2xl rounded-3xl border border-gray-200">
//       <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Job Overview</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 text-gray-800 text-[17px] leading-relaxed">
//         <p><span className="font-semibold">Company Name:</span> {getValue('companyName')}</p>
//         <p><span className="font-semibold">Company Description:</span> {getValue('companyDescription')}</p>
//         <p><span className="font-semibold">Job Title:</span> {getValue('jobTitle')}</p>
//         <p><span className="font-semibold">Job Description:</span> {getValue('jobDescription')}</p>
//         <p><span className="font-semibold">Salary:</span> {getValue('salary')}</p>
//         <p><span className="font-semibold">Location Type:</span> {getValue('locationType')}</p>
//         <p><span className="font-semibold">City:</span> {getValue('city')}</p>
//         <p><span className="font-semibold">Area:</span> {getValue('area')}</p>
//         <p><span className="font-semibold">Pincode:</span> {getValue('pincode')}</p>
//         <p><span className="font-semibold">Street Address:</span> {getValue('streetAddress')}</p>
//       </div>

//       <div className="flex justify-end gap-4 mt-12">
//         <button
//           onClick={handleEdit}
//           className="flex items-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
//         >
//           <PencilIcon className="w-5 h-5" />
//           Edit
//         </button>
//         <button
//           onClick={handleNext}
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
//         >
//           Next
//           <ArrowRightIcon className="w-5 h-5" />
//         </button>
//       </div>
//     </div>
//   );
// }
