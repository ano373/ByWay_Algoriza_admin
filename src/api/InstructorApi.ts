import { http } from "../lib/http";
import type { ApiResponse } from "../types/general";
import type {
  Instructor,
  InstructorFormData,
  InstructorPaginationQuery,
} from "../types/Instrcutor";

async function fetchInstructorById(id: number): Promise<Instructor> {
  const response = await http.get<Instructor>(`/instructors/${id}`);
  return response.data;
}

async function fetchInstructors(
  params?: InstructorPaginationQuery
): Promise<ApiResponse<Instructor[]>> {
  const response = await http.get<ApiResponse<Instructor[]>>(`/instructors`, {
    params: params,
  });
  return response.data;
}

async function deleteInstructor(id: number): Promise<void> {
  await http.delete(`/instructors/${id}`);
}

export async function addInstructor(
  payload: InstructorFormData
): Promise<ApiResponse<Instructor>> {
  const response = await http.post(`/instructors`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

export async function updateInstructor(
  payload: InstructorFormData
): Promise<ApiResponse<Instructor>> {
  const response = await http.put(
    `instructors/${payload.instructorId}`,
    payload
  );

  return response.data;
}

export const InstructorApi = {
  fetchInstructors,
  deleteInstructor,
  fetchInstructorById,
  addInstructor,
  updateInstructor,
};
