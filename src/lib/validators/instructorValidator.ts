import type {
  Instructor,
  InstructorError,
  InstructorRequest,
} from "@/types/Instrcutor";
import { isValidUrl } from "../helpers";

export function validateInstructor(data: Instructor | InstructorRequest) {
  const errors: InstructorError = {};

  // --- Name Validation ---
  if (!data.name.trim()) {
    errors.name = "Name is required.";
  } else if (/[0-9]/.test(data.name)) {
    errors.name = "Name must not contain numbers.";
  } else if (data.name.length > 50) {
    errors.name = "Name must not exceed 50 characters.";
  }

  // --- Job Title Validation ---
  if (!data.jobTitle || !data.jobTitle.trim()) {
    errors.jobTitle = "Job title is required.";
  }

  // --- Rating Validation ---
  if (!data.rating) {
    errors.rating = "Rating is required.";
  } else if (!Number.isInteger(data.rating)) {
    errors.rating = "Rating must be an integer.";
  } else if (data.rating < 1 || data.rating > 5) {
    errors.rating = "Rating must be between 1 and 5.";
  }

  // --- Description Validation ---
  if (!data.description.trim()) {
    errors.description = "Description is required.";
  } else if (data.description.length > 4000) {
    errors.description = "Description must not exceed 4000 characters.";
  }

  if (data.profileImageUrl && data.profileImageUrl.trim()) {
    if (!isValidUrl(data.profileImageUrl)) {
      errors.profileImageUrl = "Profile image URL must be a valid URL.";
    }
  }

  return errors;
}
