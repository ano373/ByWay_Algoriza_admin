import { use, useState } from "react";
import CourseCard from "../components/Course/CourseCard";
import { CourseToolBar } from "../components/Course/CourseToolBar";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import type { CoursePaginationParameter } from "../types/course";
import { Pagination } from "../components/UI/Pagination";
import { LoadingSpinner } from "../components/UI/LoadingSpinner";
import { ErrorMessage } from "../components/UI/ErrorMessage";
import { useCourses } from "../hooks/course.hooks";

export default function CoursesPage() {
  const { data: summary } = useDashboardSummary();

  const [CoursePaginationParameter, setCoursePaginationParameter] =
    useState<CoursePaginationParameter>();

  const { data, isLoading, isError } = useCourses(CoursePaginationParameter);
  const courses = data?.value ?? [];

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message="Failed to load Courses" />;

  return (
    <div className="flex-1 p-8 bg-gray-50  w-full h-full">
      <div className="text-4xl"> Courses </div>
      <hr className="border-gray-400 my-6" />

      <CourseToolBar
        onAddClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        onSearch={function (query: string): void {
          throw new Error("Function not implemented.");
        }}
        onLevelChange={function (
          event: React.ChangeEvent<HTMLSelectElement>
        ): void {
          throw new Error("Function not implemented.");
        }}
        CoursesCount={summary?.coursesCount || 0}
        levelOptions={[]}
        selectedLevel={""}
      />

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard
          courseId={2017}
          title="Data Structures & Algorithms in C#"
          instructorName="emad ayman"
          categoryName="Frontend"
          level="Expert"
          rating={4}
          totalDurationMinutes={880}
          totalLessonCount={35}
          price={159.99}
          thumbnailUrl="https://picsum.photos/700/430"
        />
        <CourseCard
          courseId={101}
          title="Beginner's Guide to Design"
          instructorName="Ronald Richards"
          categoryName="UI/UX Design"
          level="Beginner"
          rating={5}
          totalDurationMinutes={1320}
          totalLessonCount={155}
          price={45.0}
          thumbnailUrl="https://picsum.photos/700/430"
        />
      </div>

      <div className="border-t border-gray-200 p-4 mt-auto">
        <Pagination
          currentPage={CoursePaginationParameter?.page ?? 1}
          totalPages={3}
          onPageChange={(page) =>
            setCoursePaginationParameter((prev) => ({ ...prev, page }))
          }
        />
      </div>
    </div>
  );
}
