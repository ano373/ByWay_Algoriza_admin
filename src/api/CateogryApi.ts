import { http } from "../lib/http";
import type { category } from "../types/category";
import type { ApiResponse } from "../types/general";

async function fetchCategories(): Promise<ApiResponse<category[]>> {
  const response = await http.get<ApiResponse<category[]>>(`/categories`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export const categoryApi = {
  getAll: fetchCategories,
};
