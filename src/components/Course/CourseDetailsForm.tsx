import type { category } from "@/types/category";
import { type CourseRequest, Levels } from "@/types/course";
import { FormField } from "../UI/FormField";
import SelectMenu from "../UI/SelectMenu";
import { StarRating } from "../UI/StarRating";
import MDEditor, { commands } from "@uiw/react-md-editor";

type Instructor = {
  instructorId: number;
  name: string;
};

type FormMode = "add" | "edit" | "view";

interface CourseDetailsFormProps {
  formData: CourseRequest;
  onChange: (field: keyof CourseRequest, value: unknown) => void;
  categoryOptions: category[];
  instructorOptions: Instructor[];
  errors: Partial<Record<keyof CourseRequest, string>>;
  mode: FormMode;
}

export function CourseDetailsForm({
  formData,
  onChange,
  categoryOptions,
  instructorOptions,
  errors,
  mode,
}: CourseDetailsFormProps) {
  const isViewMode = mode === "view";
  const inputClass = "border p-2 w-full border-gray-300 rounded-lg px-3 py-2";

  return (
    <div className="space-y-6">
      <FormField label="Thumbnail URL" error={errors.thumbnailUrl}>
        <div className="flex gap-4 items-start">
          <div className="w-80 h-52 border border-gray-300 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            {formData.thumbnailUrl ? (
              <img
                src={formData.thumbnailUrl}
                alt={formData.title || "Thumbnail preview"}
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
              value={formData.thumbnailUrl}
              onChange={(e) => onChange("thumbnailUrl", e.target.value)}
              className={inputClass}
              disabled={isViewMode}
            />
          </div>
        </div>
      </FormField>

      {/* Title */}
      <FormField label="Title" error={errors.title}>
        <input
          placeholder="Write here..."
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => onChange("title", e.target.value)}
          className={inputClass}
          disabled={isViewMode}
        />
      </FormField>

      {/* Category + Level */}
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Category" error={errors.categoryId}>
          <SelectMenu
            currentSelection={formData.categoryId}
            onChange={(e) => onChange("categoryId", e.target.value)}
            disabled={isViewMode}
          >
            {categoryOptions.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.name}
              </option>
            ))}
          </SelectMenu>
        </FormField>

        <FormField label="Level" error={errors.level}>
          <SelectMenu
            currentSelection={formData.level}
            onChange={(e) => onChange("level", e.target.value)}
            disabled={isViewMode}
          >
            {Levels.configs.map((lvl) => (
              <option key={lvl.value} value={lvl.value}>
                {lvl.label}
              </option>
            ))}
          </SelectMenu>
        </FormField>
      </div>

      {/* Instructor + Cost */}
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Instructor" error={errors.instructorId}>
          <SelectMenu
            currentSelection={formData.instructorId}
            onChange={(e) => onChange("instructorId", e.target.value)}
            disabled={isViewMode}
          >
            {instructorOptions.map((inst) => (
              <option key={inst.instructorId} value={inst.instructorId}>
                {inst.name}
              </option>
            ))}
          </SelectMenu>
        </FormField>

        <FormField label="Cost" error={errors.price}>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={(e) => onChange("price", e.target.value)}
            className={inputClass}
            disabled={isViewMode}
          />
        </FormField>
      </div>

      {/* Rating */}
      <FormField label="Rating" error={errors.rating}>
        <div className="flex justify-start pl-52 mb-8 scale-150">
          <StarRating
            editable={!isViewMode}
            value={formData.rating}
            onChange={(value) => onChange("rating", value)}
          />
        </div>
      </FormField>

      {/* Description + Certification */}
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Description" error={errors.description}>
          <MDEditor
            value={formData.description}
            onChange={(value) => onChange("description", value || "")}
            preview={isViewMode ? "preview" : "live"}
            hideToolbar={isViewMode}
            height={200}
            commands={[
              commands.bold,
              commands.italic,
              commands.unorderedListCommand,
            ]}
          />
        </FormField>

        <FormField label="Certification" error={errors.certification}>
          <MDEditor
            value={formData.certification}
            onChange={(value) => onChange("certification", value || "")}
            preview={isViewMode ? "preview" : "live"}
            hideToolbar={isViewMode}
            height={200}
            commands={[
              commands.bold,
              commands.italic,
              commands.unorderedListCommand,
            ]}
          />
        </FormField>
      </div>
    </div>
  );
}
