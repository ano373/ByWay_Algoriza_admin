import { http } from "../lib/http";
import type { DashboardSummary } from "../types/dashboard";
import type { ApiResponse } from "../types/general";

async function fetchDashboardSummary(): Promise<ApiResponse<DashboardSummary>> {
  const res = await http.get<ApiResponse<DashboardSummary>>(
    "/dashboard/summary"
  );
  return res.data;
}

export const DashboardApi = {
  fetchDashboardSummary,
};
