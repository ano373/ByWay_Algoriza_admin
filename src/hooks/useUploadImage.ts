import { UploadApi } from "@/api/UploadApi";
import type { UploadImageRequest, UploadImageResponse } from "@/types/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUploadImage() {
  const queryClient = useQueryClient();

  return useMutation<UploadImageResponse, Error, UploadImageRequest>({
    mutationFn: (request) => UploadApi.Image(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });
}
