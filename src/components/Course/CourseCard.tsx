import { StarRating } from "../UI/StarRating";
import { ActionColumn } from "../UI/ActionColumn";

interface CourseCardProps {
  courseId: number;
  title: string;
  instructorName: string;
  categoryName: string;
  level: string;
  rating: number;
  totalDurationMinutes: number;
  totalLessonCount: number;
  price: number;
  thumbnailUrl: string;
}

export default function CourseCard({
  title,
  instructorName,
  categoryName,
  level,
  rating,
  totalDurationMinutes,
  totalLessonCount,
  price,
  thumbnailUrl,
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
          src={thumbnailUrl}
          alt={title}
          className="w-full h-40 object-cover"
        />
        <span className="absolute top-4 left-0 bg-primary text-blue-600 rounded-2xl ml-2 px-4 py-1  font-normal">
          {categoryName}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>

        <p className="text-sm text-gray-600 mb-2">By {instructorName}</p>

        <div className="flex justify-start mb-2">
          <StarRating editable={false} value={rating} />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <span>{formatDuration(totalDurationMinutes)}</span>
          <span className="text-gray-400">|</span>
          <span>{totalLessonCount} Lectures</span>
          <span className="text-gray-400">|</span>
          <span>{level}</span>
        </div>

        <p className="text-xl font-bold text-gray-900 mb-3">
          ${price.toFixed(2)}
        </p>

        <ActionColumn
          onView={function (): void {
            throw new Error("Function not implemented.");
          }}
          onEdit={function (): void {
            throw new Error("Function not implemented.");
          }}
          onDelete={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
}
