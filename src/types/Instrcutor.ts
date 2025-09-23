export const jobTitles = [
  "Fullstack Developer",
  "Frontend Developer",
  "Backend Developer",
  "UX/XI Designer",
] as const;

export type JobTitle = (typeof jobTitles)[number];

export interface Instructor {
  instructorId: number;
  profileImageUrl?: string;
  name: string;
  jobTitle: JobTitle;
  rating: number;
  description: string;
  createdAt: Date;
}
