import { http } from "../lib/http";
import type {
  CourseDetails,
  CoursePaginationParameter,
  CourseSummary,
} from "../types/course";
import type { ApiResponse } from "../types/general";

async function fetchCourseById(
  id: number
): Promise<ApiResponse<CourseDetails>> {
  const response = await http.get<ApiResponse<CourseDetails>>(`/courses/${id}`);
  return response.data;
}

async function fetchCourses(
  params?: CoursePaginationParameter
): Promise<ApiResponse<CourseSummary[]>> {
  const response = await http.get<ApiResponse<CourseSummary[]>>(`/courses`, {
    params: params,
  });
  return response.data;
}

async function deleteCourse(id: number): Promise<void> {
  await http.delete(`/courses/${id}`);
}

export async function addCourse(
  payload: InstructorFormData
): Promise<ApiResponse<ApiResponse<CourseSummary>>> {
  const response = await http.post(`/instructors`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}
