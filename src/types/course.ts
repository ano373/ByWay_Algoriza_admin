import type { category } from "./category";
import { createEnumConfig } from "./general";
import type { Instructor } from "./Instrcutor";

export interface CourseRequest {
  courseId?: number;
  thumbnailUrl?: string;
  title: string;
  level: Level | "";
  rating: number;
  price: number;
  description: string;
  certification: string;
  instructorId: number;
  categoryId: number;
  sections: CourseSection[];
}

export type CourseSummary = {
  courseId: number;
  title: string;
  instructorName: string;
  categoryName: string;
  level: Level;
  rating: number;
  totalDurationMinutes: number;
  totalLessonCount: number;
  price: number;
  thumbnailUrl: string;
};

export type CourseDetails = {
  courseId: number;
  title: string;
  thumbnailUrl: string;
  level: Level;
  price: number;
  rating: number;
  totalLessonCount: number;
  totalDurationMinutes: number;
  description: string;
  certification: string;
  instructor: Instructor;
  category: category;
  sections: CourseSection[];
};

export type CourseSection = {
  localId?: number; // For frontend key indexing only [not sent to backend]
  courseSectionId?: number;
  title: string;
  lessonCount: number;
  durationMinutes: number;
  order?: number;
};

export type CoursePaginationParameter = {
  page?: number;
  limit?: number;
  search?: string;
  categoryIds?: number;
};

export const Levels = createEnumConfig([
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Expert", value: "Expert" },
  { label: "All Levels", value: "AllLevels" },
] as const);

export type Level = (typeof Levels.values)[number];
