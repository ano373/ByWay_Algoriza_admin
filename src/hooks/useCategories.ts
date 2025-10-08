import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "@/api/CateogryApi";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 min
  });
}
