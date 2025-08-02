"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserFormData, FormErrors } from "../types";
import { validateForm } from "../utils/validation";
import { downloadPDF } from "../utils/pdfGenerator";

interface UserFormProps {
  initialData?: UserFormData;
}

export default function UserForm({ initialData }: UserFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<UserFormData>(
    initialData || {
      name: "",
      email: "",
      phone: "",
      position: "",
      description: "",
    }
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleViewPDF = () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Navigate to PDF preview with form data
    const queryParams = new URLSearchParams({
      data: JSON.stringify(formData),
    });
    router.push(`/preview?${queryParams.toString()}`);
  };

  const handleDownloadPDF = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await downloadPDF(formData);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-black">Add Your details</h1>
        </div>

        <form className="space-y-6">
          {/* Name Field */}
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <svg
                className="w-5 h-5 text-gray-400 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border-none outline-none text-gray-700 placeholder-gray-400"
                  placeholder="e.g. John Doe"
                />
              </div>
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <svg
                className="w-5 h-5 text-gray-400 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border-none outline-none text-gray-700 placeholder-gray-400"
                  placeholder="e.g. Johndoe@gmail.com"
                />
              </div>
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <svg
                className="w-5 h-5 text-gray-400 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <div className="flex-1">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border-none outline-none text-gray-700 placeholder-gray-400"
                  placeholder="e.g. (220) 222 -20002"
                />
              </div>
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Position Field */}
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <svg
                className="w-5 h-5 text-gray-400 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              <div className="flex-1">
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full border-none outline-none text-gray-700 placeholder-gray-400"
                  placeholder="e.g. Junior Front end Developer"
                />
              </div>
            </div>
          </div>

          {/* Description Field */}
          <div className="relative">
            <div className="flex items-start border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <svg
                className="w-5 h-5 text-gray-400 mr-3 mt-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border-none outline-none text-gray-700 placeholder-gray-400 resize-none"
                  placeholder="e.g. Work expriences"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={handleViewPDF}
              className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
            >
              View PDF
            </button>
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {isLoading ? "Generating..." : "Download PDF"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
