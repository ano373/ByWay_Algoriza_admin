export type Mode = "view" | "add" | "edit";

export interface Meta {
  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
}
