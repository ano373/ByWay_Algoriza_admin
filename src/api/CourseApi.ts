import { http } from "../lib/http";
import type {
  CourseDetails,
  CoursePaginationParameter,
  CourseRequest,
  CourseSummary,
} from "../types/course";
import type { ApiResponse } from "../types/general";

export async function fetchCourseById(
  id: number
): Promise<ApiResponse<CourseDetails>> {
  const response = await http.get<ApiResponse<CourseDetails>>(`/courses/${id}`);
  return response.data;
}

export async function fetchCourses(
  params?: CoursePaginationParameter
): Promise<ApiResponse<CourseSummary[]>> {
  const response = await http.get<ApiResponse<CourseSummary[]>>(`/courses`, {
    params: params,
  });
  return response.data;
}

export async function deleteCourse(id: number): Promise<void> {
  await http.delete(`/courses/${id}`);
}

export async function addCourse(
  payload: CourseRequest
): Promise<ApiResponse<ApiResponse<CourseSummary>>> {
  const response = await http.post(`/courses`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

export async function updateCourse(
  payload: CourseRequest
): Promise<ApiResponse<CourseSummary>> {
  const response = await http.put(`/courses/${payload.courseId}`, payload);

  return response.data;
}
