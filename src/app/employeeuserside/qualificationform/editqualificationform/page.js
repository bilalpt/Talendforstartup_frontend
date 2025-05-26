'use client';

// Define helper components first
function InputField({ label }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-[#555454] mb-1">{label}</label>
      <input
        type="text"
        className="w-full px-4 py-2 border border-[#ccc] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CD0A1A] focus:border-[#CD0A1A] text-sm"
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

// Main export component
export default function Editqualificationform() {
  return (
    <section className="max-w-3xl mx-auto my-12 p-8 sm:p-10 bg-white border border-gray-300 shadow-2xl rounded-lg">
      <h1 className="text-3xl sm:text-4xl font-semibold text-center text-[#CD0A1A] mb-10">
        Edit Qualification
      </h1>

      <form className="space-y-10">
        <Section title="Education">
          <InputField label="Degree" />
          <InputField label="Institution" />
          <InputField label="Year" />
        </Section>

        <Section title="Skills">
          <div className="sm:col-span-2 flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter a skill"
              className="flex-1 px-4 py-2 border border-[#ccc] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CD0A1A] text-sm"
            />
            <button
              type="button"
              className="bg-[#CD0A1A] text-white px-4 py-2 rounded-md hover:bg-[#a50915] text-sm"
            >
              Add
            </button>
          </div>
        </Section>

        <Section title="Certifications">
          <InputField label="Certificate Name" />
          <InputField label="Organization" />
        </Section>

        <Section title="Languages">
          <div className="mb-4 sm:col-span-2">
            <label className="block text-sm font-medium text-[#555454] mb-2">Languages Known</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 cursor-pointer transition">
                <input type="checkbox" className="accent-[#CD0A1A] w-4 h-4" />
                <span className="text-sm text-gray-800">Language</span>
              </label>
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
