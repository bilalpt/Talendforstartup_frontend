'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function QualificationsForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    education: { degree: '', institution: '', year: '' },
    skillInput: '',
    skills: [],
    cert: { name: '', org: '' },
    languages: [],
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/homepagesignup');
    }
  }, [router]);

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleLangCheckboxChange = (language) => {
    setFormData((prev) => {
      const isChecked = prev.languages.includes(language);
      return {
        ...prev,
        languages: isChecked
          ? prev.languages.filter((lang) => lang !== language)
          : [...prev.languages, language],
      };
    });
  };

  const handleSkillInputChange = (val) => {
    setFormData((prev) => ({
      ...prev,
      skillInput: val,
    }));
  };

  const handleAddSkill = () => {
    const trimmedSkill = formData.skillInput.trim();
    if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmedSkill],
        skillInput: '',
      }));
    }
  };

  const validateForm = () => {
    const { education, skills, cert, languages } = formData;

    if (!education.degree || !education.institution || !education.year) {
      alert('Please fill in all education fields.');
      return false;
    }

    if (skills.length === 0) {
      alert('Please add at least one skill.');
      return false;
    }

    if (!cert.name || !cert.org) {
      alert('Please fill in both certificate name and organization.');
      return false;
    }

    if (languages.length === 0) {
      alert('Please select at least one language.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const userId = localStorage.getItem('userId');
    const payload = {
      userId: userId,
      education: formData.education,
      skill: formData.skills,
      cert: formData.cert,
      lang: formData.languages,
    };

    try {
      const res = await fetch('https://talent4startup.onrender.com/users/user-qualification', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to update');

      alert('Form updated successfully!');
      router.push('/'); // Navigate to home page after submission
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Update failed. Check console for details.');
    }
  };

  const languages = [
    'English', 'Assamese', 'Bengali', 'Bodo', 'Dogri', 'Gujarati', 'Hindi', 'Kannada',
    'Kashmiri', 'Konkani', 'Maithili', 'Malayalam', 'Manipuri', 'Marathi',
    'Nepali', 'Odia', 'Punjabi', 'Sanskrit', 'Santali', 'Sindhi', 'Tamil',
    'Telugu', 'Urdu'
  ];

  return (
    //qualification forms
    <section className="max-w-3xl mx-auto my-12 p-8 sm:p-10 bg-white border border-gray-300 shadow-2xl rounded-lg">
      <h1 className="text-3xl sm:text-4xl font-semibold text-center text-[#CD0A1A] mb-10">
        Qualifications Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        <Section title="Education">
          <InputField label="Degree" value={formData.education.degree} onChange={(val) => handleChange('education', 'degree', val)} />
          <InputField label="Institution" value={formData.education.institution} onChange={(val) => handleChange('education', 'institution', val)} />
          <InputField label="Year" value={formData.education.year} onChange={(val) => handleChange('education', 'year', val)} />
        </Section>

        <Section title="Skills">
          <div className="sm:col-span-2 flex items-center gap-4">
            <input
              type="text"
              value={formData.skillInput}
              onChange={(e) => handleSkillInputChange(e.target.value)}
              placeholder="Enter a skill"
              className="flex-1 px-4 py-2 border border-[#ccc] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CD0A1A] text-sm"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-[#CD0A1A] text-white px-4 py-2 rounded-md hover:bg-[#a50915] text-sm"
            >
              Add
            </button>
          </div>
          {formData.skills.length > 0 && (
            <ul className="sm:col-span-2 mt-3 list-disc list-inside text-sm text-gray-800">
              {formData.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Certifications">
          <InputField label="Certificate Name" value={formData.cert.name} onChange={(val) => handleChange('cert', 'name', val)} />
          <InputField label="Organization" value={formData.cert.org} onChange={(val) => handleChange('cert', 'org', val)} />
        </Section>

        <Section title="Languages">
          <div className="mb-4 sm:col-span-2">
            <label className="block text-sm font-medium text-[#555454] mb-2">Languages Known</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {languages.map((language, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    value={language}
                    checked={formData.languages.includes(language)}
                    onChange={() => handleLangCheckboxChange(language)}
                    className="accent-[#CD0A1A] w-4 h-4"
                  />
                  <span className="text-sm text-gray-800">{language}</span>
                </label>
              ))}
            </div>
          </div>
        </Section>

        <div className="text-center">
          <button
            type="submit"
            className="bg-[#CD0A1A] hover:bg-[#a50915] text-white font-semibold py-3 px-10 rounded-md transition duration-300 shadow-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

function InputField({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-[#555454] mb-1">{label}</label>
      <input
        type="text"
        className="w-full px-4 py-2 border border-[#ccc] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CD0A1A] focus:border-[#CD0A1A] text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold text-[#CD0A1A] mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}
