import type { Mode } from "@/types/general";
import {
  type Instructor,
  type InstructorRequest,
  type InstructorRequestError,
  type JobTitle,
  JobTitles,
} from "@/types/Instrcutor";
import { useState } from "react";
import { FormField } from "../UI/FormField";
import SelectMenu from "../UI/SelectMenu";
import { StarRating } from "../UI/StarRating";

interface InstructorFormProps {
  initialData?: Instructor;
  errors?: InstructorRequestError;
  mode: Mode;
  onClose: () => void;
  onSubmit?: (data: InstructorRequest) => void;
}

export default function InstructorForm({
  initialData,
  errors,
  mode,
  onClose,
  onSubmit,
}: InstructorFormProps) {
  const isView = mode === "view";
  //const isEdit = mode === "edit";
  const isAdd = mode === "add";

  const [formData, setFormData] = useState<InstructorRequest>(() => {
    if (initialData) {
      // Convert Instructor to InstructorRequest
      const { ...formFields } = initialData;
      return formFields;
    }
    return {
      name: "",
      jobTitle: "",
      rating: 0,
      description: "",
    };
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      jobTitle: e.target.value as JobTitle,
    }));
  };

  const handleRatingChange = (newRating: number) => {
    setFormData((prev) => ({ ...prev, rating: newRating }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold capitalize">{mode} Instructor</h2>

      <FormField label="Thumbnail URL" error={errors?.profileImageUrl}>
        <div className="flex gap-4 items-start">
          <div className="w-48 h-48 mx-auto border border-gray-300 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 shadow-md">
            {formData.profileImageUrl ? (
              <img
                src={formData.profileImageUrl}
                alt={formData.name || "Profile preview"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>

          <div className="flex-1">
            <input
              placeholder="Enter image URL..."
              type="text"
              name="thumbnailUrl"
              value={formData.profileImageUrl}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  profileImageUrl: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              disabled={isView}
            />
          </div>
        </div>
      </FormField>

      <FormField error={errors?.name} label="Name">
        <input
          name="name"
          value={formData.name}
          onChange={handleNameChange}
          disabled={isView}
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </FormField>

      <div className="flex gap-4">
        <div className="flex-1">
          <FormField error={errors?.jobTitle} label="Job Title">
            <SelectMenu
              currentSelection={formData.jobTitle}
              onChange={handleJobTitleChange}
            >
              {JobTitles.configs.map((job) => (
                <option key={job.value} value={job.value}>
                  {job.label}
                </option>
              ))}
            </SelectMenu>
          </FormField>
        </div>

        <div className="flex-1">
          <FormField error={errors?.rating} label="Rate">
            <div className="flex justify-start">
              <StarRating
                value={formData.rating}
                editable={!isView}
                onChange={handleRatingChange}
              />
            </div>
          </FormField>
        </div>
      </div>

      <FormField error={errors?.description} label="Description">
        <textarea
          name="description"
          disabled={isView}
          value={formData.description}
          onChange={handleDescriptionChange}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </FormField>

      {!isView && (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-4 rounded-lg bg-gray-200 text-gray-400"
          >
            Cancel
          </button>
          <button type="submit" className="primary-black-button w-full">
            {isAdd ? "Add" : "Update"}
          </button>
        </div>
      )}
    </form>
  );
}
