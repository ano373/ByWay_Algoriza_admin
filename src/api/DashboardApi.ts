import { useQuery } from "@tanstack/react-query";
import { http } from "../lib/http";
import type { DashboardSummary } from "../types/dashboard";
import type { ApiResponse } from "../types/general";

async function fetchDashboardSummary(): Promise<ApiResponse<DashboardSummary>> {
  const res = await http.get<ApiResponse<DashboardSummary>>(
    "/dashboard/summary"
  );
  return res.data;
}

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboardSummary"],
    queryFn: fetchDashboardSummary,
    select: (data) => data.value,
    staleTime: 60_000, // 1 min
    refetchOnWindowFocus: false,
  });
}

export const DashboardApi = {
  useSummary: useDashboardSummary,
};
