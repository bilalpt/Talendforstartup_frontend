'use client';

import { useState } from 'react';

export default function QualificationsForm() {
  const [formData, setFormData] = useState({
    work: { title: '', company: '', duration: '' },
    education: { degree: '', institution: '', year: '' },
    skill: { name: '', level: '' },
    licence: { name: '', authority: '' },
    cert: { name: '', org: '' },
    lang: { name: '', level: '' },
  });

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    alert('Form Submitted! Check console for output.');
  };

  return (
    <section className="max-w-3xl mx-auto my-12 p-8 sm:p-10 bg-white border border-gray-300 shadow-2xl rounded-lg">
      <h1 className="text-3xl sm:text-4xl font-semibold text-center text-[#CD0A1A] mb-10">
        Qualifications Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">

        <Section title="Work Experience">
          <InputField label="Job Title" value={formData.work.title} onChange={(val) => handleChange('work', 'title', val)} />
          <InputField label="Company" value={formData.work.company} onChange={(val) => handleChange('work', 'company', val)} />
          <InputField label="Duration" value={formData.work.duration} onChange={(val) => handleChange('work', 'duration', val)} />
        </Section>

        <Section title="Education">
          <InputField label="Degree" value={formData.education.degree} onChange={(val) => handleChange('education', 'degree', val)} />
          <InputField label="Institution" value={formData.education.institution} onChange={(val) => handleChange('education', 'institution', val)} />
          <InputField label="Year" value={formData.education.year} onChange={(val) => handleChange('education', 'year', val)} />
        </Section>

        <Section title="Skills">
          <InputField label="Skill Name" value={formData.skill.name} onChange={(val) => handleChange('skill', 'name', val)} />
          <InputField label="Proficiency Level" value={formData.skill.level} onChange={(val) => handleChange('skill', 'level', val)} />
        </Section>

        <Section title="Certifications">
          <InputField label="Certificate Name" value={formData.cert.name} onChange={(val) => handleChange('cert', 'name', val)} />
          <InputField label="Organization" value={formData.cert.org} onChange={(val) => handleChange('cert', 'org', val)} />
        </Section>

        <Section title="Languages">
          <InputField label="Language" value={formData.lang.name} onChange={(val) => handleChange('lang', 'name', val)} />
          <InputField label="Fluency Level" value={formData.lang.level} onChange={(val) => handleChange('lang', 'level', val)} />
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
