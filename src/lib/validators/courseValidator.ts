import type { CourseRequest, CourseSection } from "@/types/course";

type CourseRequestError = Partial<
  Record<Exclude<keyof CourseRequest, "sections">, string>
>;
type SectionError = Partial<Record<keyof CourseSection, string>>;

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export function validateCourse(data: CourseRequest) {
  const courseErrors: CourseRequestError = {};
  const sectionErrors: SectionError[] = [];

  // --- Course Details Validation ---
  if (!data.title.trim()) {
    courseErrors.title = "Course title is required.";
  } else if (data.title.length < 5) {
    courseErrors.title = "Course title must be at least 5 characters.";
  } else if (data.title.length > 200) {
    courseErrors.title = "Course title must not exceed 200 characters.";
  }

  if (data.thumbnailUrl && data.thumbnailUrl.trim()) {
    if (data.thumbnailUrl.length > 1000) {
      courseErrors.thumbnailUrl =
        "Thumbnail URL must not exceed 1000 characters.";
    } else if (!isValidUrl(data.thumbnailUrl)) {
      courseErrors.thumbnailUrl = "Thumbnail URL must be a valid URL.";
    }
  }

  if (!data.categoryId) courseErrors.categoryId = "Category ID is required.";
  if (!data.instructorId)
    courseErrors.instructorId = "Instructor ID is required.";
  if (!data.level || !data.level.trim())
    courseErrors.level = "Level is required.";

  if (isNaN(data.price)) {
    courseErrors.price = "Price must be a valid number.";
  } else if (data.price < 1 || data.price > 99999) {
    courseErrors.price = "Price must be between 1 and 99,999.";
  }

  if (typeof data.rating !== "number" || isNaN(data.rating)) {
    courseErrors.rating = "Rating must be a valid number.";
  } else if (data.rating < 1 || data.rating > 5) {
    courseErrors.rating = "Rating must be between 1 and 5.";
  }

  if (!data.description.trim()) {
    courseErrors.description = "Course description is required.";
  } else if (data.description.length > 4000) {
    courseErrors.description = "Description must not exceed 4000 characters.";
  }

  if (!data.certification.trim()) {
    courseErrors.certification = "Certification details are required.";
  } else if (data.certification.length > 4000) {
    courseErrors.certification =
      "Certification details must not exceed 4000 characters.";
  }

  // --- Course Sections Validation ---
  (data.sections || []).forEach((section) => {
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
    sectionErrors.push(sErr);
  });

  const isCourseValid = Object.keys(courseErrors).length === 0;
  const areSectionsValid = sectionErrors.every(
    (err) => Object.keys(err).length === 0
  );

  return {
    courseErrors,
    sectionErrors,
    isValid: isCourseValid && areSectionsValid,
  };
}
