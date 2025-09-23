import { useState } from "react";
import type { Mode } from "../../types/general";
import { StarRating } from "./StarRating";
import { type JobTitle, jobTitles } from "../../types/Instrcutor";
import SelectMenu from "../UI/SelectMenu";

interface InstructorFormProps {
  mode: Mode;
  onClose: () => void;
}

export default function InstructorForm({ mode, onClose }: InstructorFormProps) {
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isAdd = mode === "add";

  const [rating, setRating] = useState(0);
  const [jobTitle, setJobTitle] = useState<JobTitle | "">("");

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (isAdd) {
          console.log("Adding instructor...");
        } else if (isEdit) {
          console.log("Editing instructor...");
        }
        onClose();
      }}
    >
      <h2 className="text-lg font-bold capitalize">{mode} Instructor</h2>

      <form className="space-y-4 p-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <SelectMenu
              label="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value as JobTitle | "")}
            >
              {jobTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </SelectMenu>
          </div>
          <div className="flex-1 ">
            <label className="block text-sm font-medium mb-1">Rate</label>
            <div className="flex justify-start">
              <StarRating value={rating} editable={true} onChange={setRating} />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          ></textarea>
        </div>
      </form>

      {!isView && (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-4 rounded-lg bg-gray-200 text-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-4 rounded-lg bg-black text-white w-full"
          >
            {isAdd ? "Add" : "Update"}
          </button>
        </div>
      )}
    </form>
  );
}
