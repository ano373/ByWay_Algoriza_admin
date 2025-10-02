import { http } from "../lib/http";
import type { category } from "../types/category";
import type { ApiResponse } from "../types/general";

async function fetchCateogries(): Promise<ApiResponse<category[]>> {
  const response = await http.get<ApiResponse<category[]>>(`/categories`);
  return response.data;
}

export const categoryApi = {
  getAll: fetchCateogries,
};
