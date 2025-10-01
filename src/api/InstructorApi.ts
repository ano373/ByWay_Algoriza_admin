import { http } from "../lib/http";
import type { ApiResponse } from "../types/general";
import type {
  Instructor,
  InstructorRequest,
  InstructorPaginationParameter,
} from "../types/Instrcutor";

async function fetchInstructorById(
  id: number
): Promise<ApiResponse<Instructor>> {
  const response = await http.get<ApiResponse<Instructor>>(
    `/instructors/${id}`
  );
  return response.data;
}

async function fetchInstructors(
  params?: InstructorPaginationParameter
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
  payload: InstructorRequest
): Promise<ApiResponse<Instructor>> {
  const response = await http.post(`/instructors`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

export async function updateInstructor(
  payload: InstructorRequest
): Promise<ApiResponse<Instructor>> {
  const response = await http.put(
    `instructors/${payload.instructorId}`,
    payload
  );

  return response.data;
}

export const InstructorApi = {
  getAll: fetchInstructors,
  deleteById: deleteInstructor,
  getById: fetchInstructorById,
  add: addInstructor,
  update: updateInstructor,
};
