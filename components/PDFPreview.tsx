"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserFormData } from "../types";
import { downloadPDF } from "../utils/pdfGenerator";

export default function PDFPreview() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<UserFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const parsedData = JSON.parse(dataParam);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [searchParams, router]);

  const handleBack = () => {
    if (userData) {
      const queryParams = new URLSearchParams({
        data: JSON.stringify(userData),
      });
      router.push(`/?${queryParams.toString()}`);
    } else {
      router.push("/");
    }
  };

  const handleDownload = async () => {
    if (!userData) return;

    setIsLoading(true);
    try {
      await downloadPDF(userData);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Information Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="space-y-4">
            {/* Name */}
            <div className="flex justify-between items-start">
              <span className="font-bold text-gray-900">Name:</span>
              <span className="text-gray-600">{userData.name}</span>
            </div>

            {/* Email */}
            <div className="flex justify-between items-start">
              <span className="font-bold text-gray-900">Email:</span>
              <span className="text-gray-600">{userData.email}</span>
            </div>

            {/* Phone Number */}
            <div className="flex justify-between items-start">
              <span className="font-bold text-gray-900">Phone Number:</span>
              <span className="text-gray-600">{userData.phone}</span>
            </div>

            {/* Position */}
            <div className="flex justify-between items-start">
              <span className="font-bold text-gray-900">Position:</span>
              <span className="text-gray-600">
                {userData.position || "Not specified"}
              </span>
            </div>

            {/* Description */}
            <div className="flex justify-between items-start">
              <span className="font-bold text-gray-900">Description:</span>
              <span className="text-gray-600 text-right max-w-xs">
                {userData.description || "No description provided"}
              </span>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 px-6 rounded-md font-bold text-lg hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          <svg
            className="w-6 h-6"
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
    </div>
  );
}
