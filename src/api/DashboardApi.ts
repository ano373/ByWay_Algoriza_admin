import axios from "axios";
import type { DashboardSummary } from "../types/dashboard";

async function fetchDashboardSummary(): Promise<DashboardSummary> {
  const res = await axios.get<DashboardSummary>(
    "https://mock.apidog.com/m1/1072040-1060319-default/admin/dashboard/summary"
  );
  return res.data;
}

export const DashboardApi = {
  fetchDashboardSummary,
};
