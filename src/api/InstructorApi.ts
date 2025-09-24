import type {
  Instructor,
  InstructorFormData,
  InstructorsListResponse,
} from "../types/Instrcutor";
import axios from "axios";

async function fetchInstructorById(id: number): Promise<Instructor> {
  const response = await axios.get<Instructor>(
    `https://mock.apidog.com/m1/1072040-1060319-default/admin/instructors/${id}`
  );
  return response.data;
}

async function fetchInstructors(page = 1): Promise<InstructorsListResponse> {
  const response = await axios.get<InstructorsListResponse>(
    `http://127.0.0.1:3658/m1/1072040-1060319-default/admin/instructors`,
    {
      params: { page },
    }
  );
  return response.data;
}

async function deleteInstructor(id: number): Promise<void> {
  await axios.delete(
    `http://127.0.0.1:3658/m1/1072040-1060319-default/admin/instructors/${id}`
  );
}

export async function addInstructor(
  payload: InstructorFormData
): Promise<Instructor> {
  const response = await axios.post(
    `http://127.0.0.1:3658/m1/1072040-1060319-default/admin/instructors`,
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function updateInstructor(
  payload: InstructorFormData
): Promise<Instructor> {
  const response = await axios.put(
    `http://127.0.0.1:3658/m1/1072040-1060319-default/admin/instructors/${payload.instructorId}`,
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
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
