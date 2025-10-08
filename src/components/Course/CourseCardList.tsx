import type { CourseSummary } from "@/types/course";
import CourseCard from "./CourseCard";

interface CourseCardListProps {
  courses: CourseSummary[];
  onView: (courseId: number) => void;
  onEdit: (courseId: number) => void;
  onDelete: (courseId: number) => void;
}

export function CourseCardList({
  courses,
  onView,
  onEdit,
  onDelete,
}: CourseCardListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.courseId}
          course={course}
          onView={() => onView(course.courseId)}
          onEdit={() => onEdit(course.courseId)}
          onDelete={() => onDelete(course.courseId)}
        />
      ))}
    </div>
  );
}
