import { UserFormData } from "../types";
import jsPDF from "jspdf";

export const generatePDF = async (userData: UserFormData): Promise<Blob> => {
  const doc = new jsPDF();

  // Set font and size
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("User Profile", 105, 20, { align: "center" });

  // Reset font for content
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  let yPosition = 40;
  const lineHeight = 8;

  // Add user data
  doc.setFont("helvetica", "bold");
  doc.text("Name:", 20, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(userData.name, 50, yPosition);

  yPosition += lineHeight + 5;

  doc.setFont("helvetica", "bold");
  doc.text("Email:", 20, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(userData.email, 50, yPosition);

  yPosition += lineHeight + 5;

  doc.setFont("helvetica", "bold");
  doc.text("Phone:", 20, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(userData.phone, 50, yPosition);

  yPosition += lineHeight + 5;

  doc.setFont("helvetica", "bold");
  doc.text("Position:", 20, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(userData.position || "Not specified", 50, yPosition);

  yPosition += lineHeight + 5;

  doc.setFont("helvetica", "bold");
  doc.text("Description:", 20, yPosition);
  doc.setFont("helvetica", "normal");

  // Handle long descriptions with word wrapping
  const description = userData.description || "No description provided";
  const splitDescription = doc.splitTextToSize(description, 170);
  doc.text(splitDescription, 20, yPosition + 5);

  // Add generation date
  yPosition += splitDescription.length * lineHeight + 15;
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, yPosition);

  // Convert to blob
  const pdfBlob = doc.output("blob");
  return pdfBlob;
};

export const downloadPDF = async (userData: UserFormData) => {
  try {
    const blob = await generatePDF(userData);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${userData.name.replace(/\s+/g, "_")}_profile.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
