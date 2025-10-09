export interface UploadImageRequest {
  file: File;
  folder: "course" | "instructor";
}

export interface UploadImageResponse {
  url: string;
  path: string;
}
