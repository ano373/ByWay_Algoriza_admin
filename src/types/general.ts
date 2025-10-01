export type Mode = "view" | "add" | "edit";

export interface Meta {
  totalItems: number;
  totalPages: number;
  hasPerv: boolean;
  hasNext: boolean;
  page: number;
  limit: number;
}

export type ApiResponse<T> = {
  value: T;
  success: boolean;
};

export const createEnumConfig = <T extends string>(
  configs: Array<{ label: string; value: T }>
) => {
  const values = configs.map((c) => c.value);
  const labelMap = Object.fromEntries(configs.map((c) => [c.value, c.label]));
  const valueMap = Object.fromEntries(configs.map((c) => [c.label, c.value]));

  return {
    configs,
    values: values as readonly T[],
    toLabel: (value: T) => labelMap[value] || value,
    toValue: (label: string) => valueMap[label] as T,
  };
};
