import { UserFormData, FormErrors } from "../types";

export const validateForm = (data: UserFormData): FormErrors => {
  const errors: FormErrors = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = "Name is required";
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!isValidPhone(data.phone)) {
    errors.phone = "Please enter a valid phone number (minimum 10 digits)";
  }

  return errors;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const digitsOnly = phone.replace(/\D/g, "");
  return digitsOnly.length >= 10;
};
