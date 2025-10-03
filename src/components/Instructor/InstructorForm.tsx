import { useState } from "react";
import type { Mode } from "../../types/general";
import { StarRating } from "../UI/StarRating";
import {
  type Instructor,
  type InstructorRequest,
  type JobTitle,
  JobTitles,
} from "../../types/Instrcutor";
import SelectMenu from "../UI/SelectMenu";
import { FormField } from "../UI/FormField";

interface InstructorFormProps {
  initialData?: Instructor;
  mode: Mode;
  onClose: () => void;
  onSubmit?: (data: InstructorRequest) => void;
}

export default function InstructorForm({
  initialData,
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
    onClose();
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold capitalize">{mode} Instructor</h2>

      <FormField label="Name">
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
          <FormField label="Job Title">
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
          <FormField label="Rate">
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

      <FormField label="Description">
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
