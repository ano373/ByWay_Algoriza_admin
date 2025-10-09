import { http } from "@/lib/http";
import type { UploadImageRequest, UploadImageResponse } from "@/types/upload";

async function uploadIamge(
  request: UploadImageRequest
): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append("img", request.file);

  const response = await http.post<UploadImageResponse>(
    "/files/upload",
    formData,
    {
      params: { folder: request.folder },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export const UploadApi = {
  Image: uploadIamge,
};
