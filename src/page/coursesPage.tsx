import { useCallback, useState } from "react";
import { CourseToolBar } from "../components/Course/CourseToolBar";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import type { CoursePaginationParameter } from "../types/course";
import { Pagination } from "../components/UI/Pagination";
import { LoadingSpinner } from "../components/UI/LoadingSpinner";
import { ErrorMessage } from "../components/UI/ErrorMessage";
import { useCourses, useDeleteCourser } from "../hooks/course.hooks";
import { useNavigate } from "react-router-dom";
import { CourseCardList } from "../components/Course/CourseCardList";
import { COURSE_PAGE_SIZE } from "../lib/const";
import Modal from "../components/UI/Modal";
import { DeletePrompt } from "../components/UI/DeletePrompt";

export default function CoursesPage() {
  const { data: summary } = useDashboardSummary();

  const [CoursePaginationParameter, setCoursePaginationParameter] =
    useState<CoursePaginationParameter>({ limit: COURSE_PAGE_SIZE });

  const { data, isLoading, isError } = useCourses(CoursePaginationParameter);
  const courses = data?.value ?? [];

  const deleteCourseMutation = useDeleteCourser();

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/courses/add");
  };
  const handleView = (courseId: number) => {
    navigate(`/courses/${courseId}/view`);
  };

  const handleEdit = (courseId: number) => {
    navigate(`/courses/${courseId}/edit`);
  };

  const handleDelete = (courseId: number, courseName: string) => {
    setDeleteModal({ id: courseId, name: courseName });
  };

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteModal) return;

    deleteCourseMutation.mutate(deleteModal.id, {
      onSettled: () => {
        setDeleteModal(null);
      },
    });
  }, [deleteModal, deleteCourseMutation]);

  const handleSearch = (query: string) => {
    setCoursePaginationParameter((prev) => ({
      ...prev,
      search: query,
      page: 1,
    }));
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message="Failed to load Courses" />;

  return (
    <div className="flex-1 p-8 bg-gray-50  w-full h-full">
      <div className="text-4xl"> Courses </div>
      <hr className="border-gray-400 my-6" />

      <CourseToolBar
        onAddClick={handleAddClick}
        onSearch={handleSearch}
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
      <CourseCardList
        courses={courses}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={(courseId) => {
          const course = courses.find((c) => c.courseId === courseId);
          if (course) handleDelete(courseId, course.title);
        }}
      />
      <div className="border-t border-gray-200 p-4 mt-auto">
        <Pagination
          currentPage={CoursePaginationParameter?.page ?? 1}
          totalPages={3}
          onPageChange={(page) =>
            setCoursePaginationParameter((prev) => ({ ...prev, page }))
          }
        />
      </div>

      {deleteModal && (
        <Modal open={true} onClose={() => setDeleteModal(null)}>
          <DeletePrompt
            label="Course"
            name={deleteModal.name}
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeleteModal(null)}
          />
        </Modal>
      )}
    </div>
  );
}
