import { useNavigate } from "react-router-dom";
import { useAddCourse, useUpdateCourse } from "./useCourse";
import type { CourseRequest } from "../types/course";

export const useCourseSubmit = (
  mode: "view" | "edit" | "add",
  courseId?: number
) => {
  const addCourseMutation = useAddCourse();
  const updateCourseMutation = useUpdateCourse();
  const navigate = useNavigate();

  const handleSubmit = async (formData: CourseRequest) => {
    if (mode === "add") {
      await addCourseMutation.mutateAsync(formData);
    } else if (mode === "edit") {
      await updateCourseMutation.mutateAsync({
        ...formData,
        courseId: courseId!,
      });
    }
    navigate("/courses");
  };

  const isSubmitting =
    addCourseMutation.isPending || updateCourseMutation.isPending;

  return { handleSubmit, isSubmitting };
};
