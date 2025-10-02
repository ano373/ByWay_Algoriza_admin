import { StarRating } from "../UI/StarRating";
import { ActionColumn } from "../UI/ActionColumn";
import type { CourseSummary } from "../../types/course";

interface CourseCardProps {
  course: CourseSummary;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CourseCard({
  course,
  onView,
  onEdit,
  onDelete,
}: CourseCardProps) {
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} Total Minutes`;
    }
    const hours = Math.floor(minutes / 60);
    return `${hours} Total Hours`;
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
        <span className="absolute top-4 left-0 bg-primary text-blue-600 rounded-2xl ml-2 px-4 py-1 font-normal">
          {course.categoryName}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-2">By {course.instructorName}</p>

        <div className="flex justify-start mb-2">
          <StarRating editable={false} value={course.rating} />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <span>{formatDuration(course.totalDurationMinutes)}</span>
          <span className="text-gray-400">|</span>
          <span>{course.totalLessonCount} Lectures</span>
          <span className="text-gray-400">|</span>
          <span>{course.level}</span>
        </div>

        <p className="text-xl font-bold text-gray-900 mb-3">
          ${course.price.toFixed(2)}
        </p>

        <ActionColumn onView={onView} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}
