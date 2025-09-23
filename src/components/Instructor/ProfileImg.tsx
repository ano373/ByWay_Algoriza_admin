import { useState } from "react";
import UserProfilePlaceHolder from "../../assets/profileImg-placeholder.png";

export default function ProfileImageForm() {
  const [previewUrl, setPreviewUrl] = useState<string>(UserProfilePlaceHolder);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex items-center gap-4">
        <img
          src={previewUrl}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-full border"
        />

        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-blue-400 text-white text-sm px-3 py-1.5
           rounded-md hover:bg-gray-800 transition-colors"
        >
          Choose Profile Image
        </label>
      </div>
    </div>
  );
}
