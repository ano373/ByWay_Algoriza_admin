// import type { Meta } from "./general";

import { createEnumConfig } from "./general";

export const JobTitles = createEnumConfig([
  { label: "Fullstack Developer", value: "FullstackDeveloper" },
  { label: "Frontend Developer", value: "FrontendDeveloper" },
  { label: "Backend Developer", value: "BackendDeveloper" },
  { label: "UI/UX Designer", value: "UIUXDesigner" },
] as const);

export type JobTitle = (typeof JobTitles.values)[number];

export interface InstructorRequest {
  instructorId?: number;
  profileImageUrl?: string;
  name: string;
  jobTitle: JobTitle | "";
  rating: number;
  description: string;
}

export interface InstructorPaginationParameter {
  limit?: number;
  page?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface Instructor {
  instructorId: number;
  profileImageUrl?: string;
  name: string;
  jobTitle: JobTitle;
  rating: number;
  description: string;
}
