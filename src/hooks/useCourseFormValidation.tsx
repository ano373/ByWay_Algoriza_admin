import { useState } from "react";
import type { CourseRequest, CourseSection } from "../types/course";

type CourseRequestError = Partial<
  Record<Exclude<keyof CourseRequest, "sections">, string>
>;
type SectionError = Partial<Record<keyof CourseSection, string>>;

export function useCourseFormValidation() {
  const [courseErrors, setCourseErrors] = useState<CourseRequestError>({});
  const [sectionErrors, setSectionErrors] = useState<SectionError[]>([]);

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  function validateCourseDetails(data: CourseRequest): boolean {
    const courseErrs: CourseRequestError = {};

    if (!data.title.trim()) courseErrs.title = "Course title is required.";
    else if (data.title.length < 5)
      courseErrs.title = "Course title must be at least 5 characters.";
    else if (data.title.length > 200)
      courseErrs.title = "Course title must not exceed 200 characters.";

    if (data.thumbnailUrl && data.thumbnailUrl.trim()) {
      if (data.thumbnailUrl.length > 1000) {
        courseErrs.thumbnailUrl =
          "Thumbnail URL must not exceed 1000 characters.";
      } else if (!isValidUrl(data.thumbnailUrl)) {
        courseErrs.thumbnailUrl = "Thumbnail URL must be a valid URL.";
      }
    }

    if (!data.categoryId) courseErrs.categoryId = "Category ID is required.";
    if (!data.instructorId)
      courseErrs.instructorId = "Instructor ID is required.";
    if (!data.level || !data.level.trim())
      courseErrs.level = "Level is required.";

    if (isNaN(data.price)) {
      courseErrs.price = "Price must be a valid number.";
    } else if (data.price < 1 || data.price > 99999) {
      courseErrs.price = "Price must be between 1 and 99,999.";
    }

    if (typeof data.rating !== "number" || isNaN(data.rating)) {
      courseErrs.rating = "Rating must be a valid number.";
    } else if (data.rating < 1 || data.rating > 5) {
      courseErrs.rating = "Rating must be between 1 and 5.";
    }

    if (!data.description.trim()) {
      courseErrs.description = "Course description is required.";
    } else if (data.description.length > 4000) {
      courseErrs.description = "Description must not exceed 4000 characters.";
    }

    if (!data.certification.trim()) {
      courseErrs.certification = "Certification details are required.";
    } else if (data.certification.length > 4000) {
      courseErrs.certification =
        "Certification details must not exceed 4000 characters.";
    }

    setCourseErrors(courseErrs);
    return Object.keys(courseErrs).length === 0;
  }

  function validateCourseSections(sections: CourseSection[]): boolean {
    const sectionErrs: SectionError[] = [];

    sections.forEach((section) => {
      const sErr: SectionError = {};

      if (!section.title || !section.title.trim()) {
        sErr.title = "Section title is required.";
      } else if (section.title.length < 3) {
        sErr.title = "Section title must be at least 3 characters.";
      } else if (section.title.length > 100) {
        sErr.title = "Section title must not exceed 100 characters.";
      }

      if (!Number.isInteger(section.lessonCount) || section.lessonCount <= 0) {
        sErr.lessonCount = "Lesson count must be a positive integer.";
      }

      if (
        typeof section.durationMinutes !== "number" ||
        !Number.isFinite(section.durationMinutes) ||
        section.durationMinutes <= 0
      ) {
        sErr.durationMinutes = "Duration must be greater than 0 minutes.";
      } else if (section.durationMinutes > 24 * 60) {
        sErr.durationMinutes = "Duration must not exceed 24 hours.";
      }

      sectionErrs.push(sErr);
    });

    setSectionErrors(sectionErrs);
    return sectionErrs.every((err) => Object.keys(err).length === 0);
  }

  return {
    courseErrors,
    sectionErrors,
    validateCourseDetails,
    validateCourseSections,
  };
}
