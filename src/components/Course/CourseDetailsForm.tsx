import type { category } from "../../types/category";
import { Levels, type CourseRequest } from "../../types/course";
import { FormField } from "../UI/FormField";
import SelectMenu from "../UI/SelectMenu";
import { StarRating } from "../UI/StarRating";

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
      {/* Thumbnail URL */}
      <FormField label="Thumbnail URL" error={errors.thumbnailUrl}>
        <input
          placeholder="Write here..."
          type="text"
          name="thumbnailUrl"
          value={formData.thumbnailUrl}
          onChange={(e) => onChange("thumbnailUrl", e.target.value)}
          className={inputClass}
          disabled={isViewMode}
        />
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
          <textarea
            placeholder="Write here..."
            name="description"
            value={formData.description}
            onChange={(e) => onChange("description", e.target.value)}
            rows={4}
            className={inputClass}
            disabled={isViewMode}
          />
        </FormField>

        <FormField label="Certification" error={errors.certification}>
          <textarea
            placeholder="Write here..."
            name="certification"
            value={formData.certification}
            onChange={(e) => onChange("certification", e.target.value)}
            rows={4}
            className={inputClass}
            disabled={isViewMode}
          />
        </FormField>
      </div>
    </div>
  );
}
