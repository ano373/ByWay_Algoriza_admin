import { http } from "../lib/http";
import type {
  CourseDetails,
  CoursePaginationParameter,
  CourseRequest,
  CourseSummary,
} from "../types/course";
import type { ApiResponse } from "../types/general";

async function fetchCourseById(
  id: number
): Promise<ApiResponse<CourseDetails>> {
  const response = await http.get<ApiResponse<CourseDetails>>(
    `/courses/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

async function fetchCourses(
  params?: CoursePaginationParameter
): Promise<ApiResponse<CourseSummary[]>> {
  const response = await http.get<ApiResponse<CourseSummary[]>>(`/courses`, {
    params: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

async function deleteCourse(id: number): Promise<void> {
  await http.delete(`/courses/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function addCourse(
  payload: CourseRequest
): Promise<ApiResponse<CourseSummary>> {
  const response = await http.post(`/courses`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

async function updateCourse(
  payload: CourseRequest
): Promise<ApiResponse<CourseSummary>> {
  const response = await http.put(`/courses/${payload.courseId}`, payload, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
}

export const CourseApi = {
  getById: fetchCourseById,
  getAll: fetchCourses,
  deleteById: deleteCourse,
  add: addCourse,
  update: updateCourse,
};
