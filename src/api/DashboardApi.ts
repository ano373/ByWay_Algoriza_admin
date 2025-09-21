import axios from "axios";
import type { DashboardSummary } from "../types/dashboard";

let count = 0;
export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  count++;
  console.log("i am here", count);
  const res = await axios.get<DashboardSummary>(
    "https://mock.apidog.com/m1/1072040-1060319-default/admin/dashboard/summary"
  );
  return res.data;
}
