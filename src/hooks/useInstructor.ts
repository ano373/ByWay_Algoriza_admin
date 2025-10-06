import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InstructorApi } from "../api/InstructorApi";
import type {
  Instructor,
  InstructorRequest,
  InstructorPaginationParameter,
} from "../types/Instrcutor";
import type { ApiResponse } from "../types/general";

export function useInstructor(id: number) {
  return useQuery({
    queryKey: ["instructor", id],
    queryFn: () => InstructorApi.getById(id),
    enabled: !!id,
  });
}

export function useInstructors(params?: InstructorPaginationParameter) {
  return useQuery({
    queryKey: ["instructors", params],
    queryFn: () => InstructorApi.getAll(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAddInstructor() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Instructor>, Error, InstructorRequest>({
    mutationFn: (payload) => InstructorApi.add(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}

export function useUpdateInstructor() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Instructor>, Error, InstructorRequest>({
    mutationFn: (payload) => InstructorApi.update(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
      if (data?.value?.instructorId) {
        queryClient.invalidateQueries({
          queryKey: ["instructor", data.value.instructorId],
        });
      }
    },
  });
}

export function useDeleteInstructor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => InstructorApi.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}
