import { useState } from "react";
import type { CourseRequest } from "../types/course";

export function useCourseFormValidation(initialData: CourseRequest) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof CourseRequest, string>>
  >({});

  const validateInput = (step: number, data: CourseRequest) => {
    const errs: typeof errors = {};

    if (step === 1) {
      if (!data.title.trim()) errs.title = "Title is required";
      if (!data.categoryId) errs.categoryId = "Category is required";
      if (!data.level) errs.level = "Level is required";
      if (!data.instructorId) errs.instructorId = "Instructor is required";
      if (data.price <= 0) errs.price = "Price must be greater than 0";
      if (data.rating < 0 || data.rating > 5)
        errs.rating = "Rating must be between 0 and 5";
      if (!data.description.trim()) errs.description = "Description required";
      if (!data.certification.trim())
        errs.certification = "Certification required";
    }

    if (step === 2) {
      if (data.price <= 0) errs.price = "Price must be greater than 0";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  return { errors, validateInput };
}
