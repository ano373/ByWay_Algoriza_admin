import type { Instructor, InstructorsListResponse } from "../types/Instrcutor";
import axios from "axios";

async function fetchInstructorById(): Promise<Instructor> {
  const res = await axios.get<Instructor>(
    `https://mock.apidog.com/m1/1072040-1060319-default/admin/instructors/1`
  );
  return res.data;
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

export const InstructorApi = {
  fetchInstructors,
  deleteInstructor,
  fetchInstructorById,
};
