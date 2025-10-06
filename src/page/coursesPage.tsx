import { useCallback, useState } from "react";
import { CourseToolBar } from "../components/Course/CourseToolBar";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import type { CoursePaginationParameter } from "../types/course";
import { Pagination } from "../components/UI/Pagination";
import { LoadingSpinner } from "../components/UI/LoadingSpinner";
import { ErrorMessage } from "../components/UI/ErrorMessage";
import { useCourses, useDeleteCourser } from "../hooks/useCourse";
import { useNavigate } from "react-router-dom";
import { CourseCardList } from "../components/Course/CourseCardList";
import { COURSE_PAGE_SIZE } from "../lib/const";
import Modal from "../components/UI/Modal";
import { DeletePrompt } from "../components/UI/DeletePrompt";
import { useCategories } from "../hooks/useCategories";

export default function CoursesPage() {
  const { data: summary } = useDashboardSummary();

  const [courseParams, setCourseParams] = useState<CoursePaginationParameter>({
    limit: COURSE_PAGE_SIZE,
  });

  const { data, isLoading, isError } = useCourses(courseParams);
  const courses = data?.value ?? [];

  const deleteCourseMutation = useDeleteCourser();

  const [deleteModal, setDeleteModal] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { data: categories } = useCategories();
  const CategoriesOptions = categories?.value;

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/courses/add");
  };

  const handleView = (courseId: number) => {
    console.log("view : ", courseId);
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
    setCourseParams((prev) => ({
      ...prev,
      search: query,
      page: 1,
    }));
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = Number(event.target.value);

    setCourseParams((prev) => ({
      ...prev,
      page: 1,
      categoryIds: selectedId,
    }));
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message="Failed to load Courses" />;

  return (
    <div className="flex-1 p-8 bg-gray-50  w-full h-full">
      <div className="text-4xl"> Courses </div>
      <hr className="border-gray-400 my-6" />

      <div className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
        <CourseToolBar
          onAddClick={handleAddClick}
          onSearch={handleSearch}
          onCateogryChange={handleCategoryChange}
          CoursesCount={summary?.coursesCount || 0}
          cateogryOptions={CategoriesOptions || []}
          currentSelectedCateogryId={courseParams.categoryIds ?? ""}
        />

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
            currentPage={courseParams?.page ?? 1}
            totalPages={3}
            onPageChange={(page) =>
              setCourseParams((prev) => ({ ...prev, page }))
            }
          />
        </div>
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
