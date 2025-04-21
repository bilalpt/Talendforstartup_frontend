'use client';
import { useState } from 'react';
import Image from 'next/image'; // 


export default function JobBasicsForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription: '',
    jobTitle: '',
    jobDescription: '',
    salary: '',
    locationType: 'On-site',
    city: '',
    area: '',
    pincode: '',
    streetAddress: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    if (!formData.city) newErrors.city = 'City is required.';
    if (formData.salary && isNaN(formData.salary)) newErrors.salary = 'Salary must be a valid number.';
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('https://talent4startup.onrender.com/jobs/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        setErrorMessage(`❌ Error: ${result.message}`);
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
          locationType: 'On-site',
          city: '',
          area: '',
          pincode: '',
          streetAddress: '',
        });
        setErrors({});
      }
    } catch (err) {
      setErrorMessage('An error occurred while submitting the job.');
      setSuccessMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      {/* Left Side - Image */}
      <div className="hidden lg:block w-xl">
        <img src="/hrsideimages/girlwithcv.svg" alt="Image" className="w-full h-full object-cover rounded-l-xl" />
      </div>

      {/* Right Side - Form */}
      <div className="max-w-xl mx-auto bg-[#f9f9f9] p-6 shadow-xl rounded-xl border border-gray-200 w-full lg:w-1/2">
        <h1 className="text-2xl font-bold text-[#CD0A1A] mb-6">Job Basics</h1>

        {successMessage && <div className="text-green-600 font-medium mb-4">{successMessage}</div>}
        {errorMessage && <div className="text-red-600 font-medium mb-4">{errorMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {[{ id: 'companyName', label: 'Company Name', required: true, type: 'text', placeholder: 'Eg: Rainbow Graphix Pvt Ltd' },
            { id: 'companyDescription', label: 'Company Description', type: 'textarea', placeholder: 'Describe your company...' },
            { id: 'jobTitle', label: 'Job Title', required: true, type: 'text' },
            { id: 'jobDescription', label: 'Job Description', required: true, type: 'textarea', placeholder: 'Describe the role and responsibilities...' },
            { id: 'salary', label: 'Salary (Per Month)', required: true, type: 'text', placeholder: 'Eg: ₹30,000' }].map(({ id, label, required, type, placeholder }) => (
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
                    rows="3"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[{ id: 'city', label: 'City', required: true },
              { id: 'area', label: 'Area' },
              { id: 'pincode', label: 'Pincode' },
              { id: 'streetAddress', label: 'Street Address' }].map(({ id, label, required }) => (
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

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white py-2 rounded-md text-base font-semibold transition duration-200 ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#CD0A1A] hover:bg-red-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
