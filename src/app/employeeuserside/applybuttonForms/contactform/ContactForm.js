"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ContactForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      router.push("/homepagesignup");
    } else {
      setFormData((prevData) => ({ ...prevData, userId }));
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("https://talent4startup.onrender.com/users/user-detail", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/employeeuserside/applybuttonForms/cvpage?jobId=${jobId}`);
      } else {
        console.error("Failed to submit form:", await response.text());
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center px-4 bg-gray-50">
      <div className="w-full md:w-1/2 max-w-md p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Add your contact information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["firstName", "lastName", "phone", "email", "city"].map((field) => (
            <div key={field}>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full p-2 border rounded-md"
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}
          <button
            type="submit"
            className="bg-[#CD0A1A] text-white w-full py-2 rounded-md"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
