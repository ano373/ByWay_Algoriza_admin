import axios from "axios";
import type { DashboardSummary } from "../types/dashboard";

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  const res = await axios.get<DashboardSummary>("/admin/dashboard/summary");
  return res.data;
}
