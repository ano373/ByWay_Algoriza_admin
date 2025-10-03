// hooks/useMultiStepForm.ts
import { useEffect, useState } from "react";
import type { CourseRequest } from "../types/course";
import { useCourseFormValidation } from "./useCourseFormValidation";
import { useCourse } from "./course.hooks";

export const useMultiStepForm = (
  mode: "view" | "edit" | "add",
  courseId?: number
) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CourseRequest>({
    title: "",
    level: "",
    rating: 0,
    price: 0,
    description: "",
    certification: "",
    instructorId: 0,
    categoryId: 0,
    thumbnailUrl: "",
    sections: [],
  });

  const {
    data: course,
    isLoading,
    isError,
  } = useCourse(courseId!, {
    enabled: mode !== "add" && !!courseId,
  });

  useEffect(() => {
    if (course?.value && mode !== "add") {
      const { instructor, category, sections, ...rest } = course.value;
      setFormData({
        ...rest,
        instructorId: instructor.instructorId,
        categoryId: category.categoryId,
        sections: sections || [],
      });
    }
  }, [course, mode]);

  const { errors, validateInput } = useCourseFormValidation(formData);

  const handleNext = () => {
    if (validateInput(step, formData)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleChange = (field: keyof CourseRequest, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    step,
    formData,
    handleChange,
    handleNext,
    handleBack,
    isLoading,
    isError,
    errors,
    validateInput,
  };
};
