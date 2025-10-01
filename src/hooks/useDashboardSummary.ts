import { useQuery } from "@tanstack/react-query";
import { DashboardApi } from "../api/DashboardApi";

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboardSummary"],
    queryFn: DashboardApi.fetchSummary,
    select: (data) => data.value,
    staleTime: 60_000, // 1 min
    refetchOnWindowFocus: false,
  });
}
