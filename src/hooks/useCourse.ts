import { CourseApi } from "@/api/CourseApi";
import type {
  CoursePaginationParameter,
  CourseSummary,
  CourseRequest,
} from "@/types/course";
import type { ApiResponse } from "@/types/general";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCourses(params?: CoursePaginationParameter) {
  return useQuery({
    queryKey: ["courses", params],
    queryFn: () => CourseApi.getAll(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCourse(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => CourseApi.getById(id),
    enabled: options?.enabled !== undefined ? options.enabled : !!id,
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
      queryClient.invalidateQueries({ queryKey: ["courses"] });
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
