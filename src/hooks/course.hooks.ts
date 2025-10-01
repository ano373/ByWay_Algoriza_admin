import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CourseApi } from "../api/CourseApi";
import type {
  CourseDetails,
  CoursePaginationParameter,
  CourseRequest,
  CourseSummary,
} from "../types/course";
import type { ApiResponse } from "../types/general";

export function useCourse(id: number) {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => CourseApi.getById(id),
    enabled: !!id,
  });
}

export function useCourses(params?: CoursePaginationParameter) {
  return useQuery({
    queryKey: ["courses", params],
    queryFn: () => CourseApi.getAll(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAddCourse() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<CourseSummary>, Error, CourseRequest>({
    mutationFn: (payload) => CourseApi.add(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<CourseSummary>, Error, CourseRequest>({
    mutationFn: (payload) => CourseApi.update(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
      if (data?.value?.courseId) {
        queryClient.invalidateQueries({
          queryKey: ["course", data.value.courseId],
        });
      }
    },
  });
}

export function useDeleteCourser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => CourseApi.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}
