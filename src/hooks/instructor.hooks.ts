import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { InstructorApi } from "../api/InstructorApi";
import type {
  Instructor,
  InstructorFormData,
  InstructorPaginationQuery,
} from "../types/Instrcutor";
import type { ApiResponse } from "../types/general";

export function useInstructor(id: number) {
  return useQuery({
    queryKey: ["instructor", id],
    queryFn: () => InstructorApi.getById(id),
    enabled: !!id,
  });
}

export function useInstructors(params?: InstructorPaginationQuery) {
  return useQuery({
    queryKey: ["instructors", params],
    queryFn: () => InstructorApi.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useAddInstructor() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Instructor>, Error, InstructorFormData>({
    mutationFn: (payload) => InstructorApi.add(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
    },
  });
}

export function useUpdateInstructor() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Instructor>, Error, InstructorFormData>({
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
    },
  });
}
