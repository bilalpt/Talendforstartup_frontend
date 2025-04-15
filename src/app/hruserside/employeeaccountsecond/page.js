'use client';
import { useState } from 'react';

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
      console.log('Submitting job form...');
      
      const response = await fetch('https://talent4startup.onrender.com/jobs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result, 'Response from API');
      
      if (!response.ok) {
        setErrorMessage(`❌ Error: ${result.message}`);
        setSuccessMessage('');
      } else {
        setErrorMessage('');
        setSuccessMessage('✅ Job created successfully!');
        console.log('Result:', result);

        // Reset form after successful submission
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
      console.error('🚨 Error:', err);
      setErrorMessage('An error occurred while submitting the job.');
      setSuccessMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-2xl rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Job Basics</h1>

      {/* Success/Error Message */}
      {successMessage && <div className="text-green-500 font-medium mb-4">{successMessage}</div>}
      {errorMessage && <div className="text-red-500 font-medium mb-4">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            placeholder="Eg: Rainbow Graphix Pvt Ltd"
            className={`mt-1 block w-full rounded-md border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} shadow-sm p-3`}
          />
          {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
        </div>

        <div>
          <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700">
            Company Description
          </label>
          <textarea
            id="companyDescription"
            name="companyDescription"
            value={formData.companyDescription}
            onChange={handleChange}
            placeholder="Introduce your company: business, culture, market position..."
            rows="4"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3"
          />
        </div>

        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className={`mt-1 block w-full rounded-md border ${errors.jobTitle ? 'border-red-500' : 'border-gray-300'} shadow-sm p-3`}
          />
          {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle}</p>}
        </div>

        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Describe the role and responsibilities..."
            className={`mt-1 block w-full rounded-md border ${errors.jobDescription ? 'border-red-500' : 'border-gray-300'} shadow-sm p-3`}
          />
          {errors.jobDescription && <p className="text-red-500 text-sm">{errors.jobDescription}</p>}
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
            Salary (Per Month) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Eg: ₹30,000"
            required
            className={`mt-1 block w-full rounded-md border ${errors.salary ? 'border-red-500' : 'border-gray-300'} shadow-sm p-3`}
          />
          {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
        </div>

        <div>
          <label htmlFor="locationType" className="block text-sm font-medium text-gray-700">
            Job Location Type <span className="text-red-500">*</span>
          </label>
          <select
            id="locationType"
            name="locationType"
            value={formData.locationType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3"
          >
            <option>On-site</option>
            <option>Remote</option>
            <option>Hybrid</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md border ${errors.city ? 'border-red-500' : 'border-gray-300'} shadow-sm p-3`}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700">
              Area
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3"
            />
          </div>
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} shadow-sm p-3`}
            />
            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
          </div>
          <div>
            <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600'} text-white py-3 rounded-md text-lg`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Job'}
          </button>
        </div>
      </form>
    </div>
  );
}
