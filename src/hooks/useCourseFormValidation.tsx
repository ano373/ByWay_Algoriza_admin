import { useState } from "react";
import type { CourseRequest } from "../types/course";

export function useCourseFormValidation(initialData: CourseRequest) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof CourseRequest, string>>
  >({});

  function validateInput(step: number, data: CourseRequest) {
    const errs: typeof errors = {};

    const isValidUrl = (url: string): boolean => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    if (step === 1) {
      // Title validation
      if (!data.title.trim()) errs.title = "Course title is required.";
      else if (data.title.length < 5)
        errs.title = "Course title must be at least 5 characters.";
      else if (data.title.length > 200)
        errs.title = "Course title must not exceed 200 characters.";

      // Thumbnail URL validation
      if (data.thumbnailUrl && data.thumbnailUrl.trim()) {
        if (data.thumbnailUrl.length > 1000) {
          errs.thumbnailUrl = "Thumbnail URL must not exceed 1000 characters.";
        } else if (!isValidUrl(data.thumbnailUrl)) {
          errs.thumbnailUrl = "Thumbnail URL must be a valid URL.";
        }
      }

      if (!data.categoryId) errs.categoryId = "Category ID is required.";

      if (!data.instructorId) errs.instructorId = "Instructor ID is required.";

      if (!data.level || !data.level.trim()) errs.level = "Level is required.";

      if (typeof data.price !== "number" || isNaN(data.price)) {
        errs.price = "Price must be a valid number.";
      } else if (data.price < 1 || data.price > 99999) {
        errs.price = "Price must be between 1 and 99,999.";
      }

      if (typeof data.rating !== "number" || isNaN(data.rating)) {
        errs.rating = "Rating must be a valid number.";
      } else if (data.rating < 1 || data.rating > 5) {
        errs.rating = "Rating must be between 1 and 5.";
      }

      if (!data.description.trim()) {
        errs.description = "Course description is required.";
      } else if (data.description.length > 4000) {
        errs.description = "Description must not exceed 4000 characters.";
      }

      if (!data.certification.trim()) {
        errs.certification = "Certification details are required.";
      } else if (data.certification.length > 4000) {
        errs.certification =
          "Certification details must not exceed 4000 characters.";
      }
    }

    if (step === 2) {
      if (data.price <= 0) errs.price = "Price must be greater than 0";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  return { errors, validateInput };
}
