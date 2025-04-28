'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function JobBasicsForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription: '',
    jobTitle: '',
    jobDescription: '',
    salary: '',
    jobType: '',
    locationType: 'On-site',
    city: '',
    area: '',
    pincode: '',
    streetAddress: '',
    userId: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    
    if (!token) {
      router.push('/homepagesignup');
    }
    if (storedUserId) {
      setFormData((prev) => ({
        ...prev,
        userId: storedUserId,
      }));
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = 'Company name is required.';
    if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required.';
    if (!formData.jobDescription) newErrors.jobDescription = 'Job description is required.';
    if (!formData.salary) newErrors.salary = 'Salary is required.';
    if (!formData.jobType) newErrors.jobType = 'Job type is required.';
    if (!formData.city) newErrors.city = 'City is required.';
    if (formData.salary && isNaN(Number(formData.salary))) newErrors.salary = 'Salary must be a valid number.';
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits.';
    if (!formData.userId) newErrors.userId = 'User ID is missing.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    // Check if errors exist before updating state and logging
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      console.log('Form validation failed. Errors:', formErrors); // Log detailed errors
      return;
    }

    try {
      setIsSubmitting(true);
      
      const response = await fetch('https://talent4startup.onrender.com/jobs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result,'3333333333333333333333333');
      

      if (!response.ok) {
        setErrorMessage(`❌ Error: ${result.message || 'Something went wrong'}`);
        setSuccessMessage('');
      } else {
        setErrorMessage('');
        setSuccessMessage('✅ Job created successfully!');
        setFormData({
          companyName: '',
          companyDescription: '',
          jobTitle: '',
          jobDescription: '',
          salary: '',
          jobType: '',
          locationType: 'On-site',
          city: '',
          area: '',
          pincode: '',
          streetAddress: '',
          userId: localStorage.getItem('userId') || '',
        });
        setErrors({});
      }
    } catch (err) {
      console.error('Error submitting job form:', err);
      setErrorMessage('An error occurred while submitting the job.');
      setSuccessMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 bg-gray-50">
      {/* Left Side - Image */}
      <div className="hidden lg:flex w-1/2 justify-center">
        <div className="relative w-96 h-96">
          <Image 
            src="/hrsideimages/girlwithcv.svg" 
            alt="Girl with CV" 
            fill 
            className="object-contain rounded-l-xl"
            priority 
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full max-w-2xl bg-white p-8 shadow-2xl rounded-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-[#CD0A1A] mb-6">Job Basics</h1>

        {successMessage && <div className="text-green-600 font-medium mb-4">{successMessage}</div>}
        {errorMessage && <div className="text-red-600 font-medium mb-4">{errorMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="userId" value={formData.userId} />

          {/* Main Fields */}
          {[ 
            { id: 'companyName', label: 'Company Name', required: true, type: 'text', placeholder: 'Eg: Rainbow Graphix Pvt Ltd' },
            { id: 'companyDescription', label: 'Company Description', type: 'textarea', placeholder: 'Describe your company...' },
            { id: 'jobTitle', label: 'Job Title', required: true, type: 'text' },
            { id: 'jobDescription', label: 'Job Description', required: true, type: 'textarea', placeholder: 'Describe the role and responsibilities...' },
            { id: 'salary', label: 'Salary (Per Month)', required: true, type: 'text', placeholder: 'Eg: ₹30,000' },
          ].map(({ id, label, required, type, placeholder }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              {type === 'textarea' ? (
                <textarea
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  rows={3}
                  className={`mt-1 block w-full rounded-md border ${errors[id] ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#CD0A1A]`}
                />
              ) : (
                <input
                  type={type}
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  required={required}
                  placeholder={placeholder}
                  className={`mt-1 block w-full rounded-md border ${errors[id] ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#CD0A1A]`}
                />
              )}
              {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
            </div>
          ))}

          {/* Job Type */}
          <div>
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md border ${errors.jobType ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#CD0A1A]`}
            >
              <option value="">Select Job Type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
            </select>
            {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType}</p>}
          </div>

          {/* Location Type */}
          <div>
            <label htmlFor="locationType" className="block text-sm font-medium text-gray-700">
              Job Location Type
            </label>
            <select
              id="locationType"
              name="locationType"
              value={formData.locationType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#CD0A1A]"
            >
              <option>On-site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>

          {/* Address Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[ 
              { id: 'city', label: 'City', required: true },
              { id: 'area', label: 'Area' },
              { id: 'pincode', label: 'Pincode' },
              { id: 'streetAddress', label: 'Street Address' },
            ].map(({ id, label, required }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  required={required}
                  className={`mt-1 block w-full rounded-md border ${errors[id] ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#CD0A1A]`}
                />
                {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#CD0A1A] text-white font-bold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-[#CD0A1A] disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
