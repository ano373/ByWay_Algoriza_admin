import type { CourseSection } from "@/types/course";
import { FormField } from "../UI/FormField";

interface ContentCardProps {
  formData: Partial<CourseSection>;
  errors?: Partial<Record<keyof CourseSection, string>>;
  onChange: (
    key: "title" | "lessonCount" | "durationMinutes",
    value: string | number
  ) => void;
  mode: "add" | "edit" | "view";
}

export function ContentCard({
  formData,
  errors,
  onChange,
  mode,
}: ContentCardProps) {
  const inputClass =
    " bg-white border p-2 w-full border-gray-300 rounded-lg px-3 py-2";
  const isViewMode = mode === "view";
  return (
    <div className=" w-full p-6 bg-gray-100 rounded-lg space-y-4">
      {/* Title Input */}

      <FormField label="Title" error={errors?.title}>
        <input
          placeholder="write here..."
          type="text"
          name="title"
          value={formData.title || ""}
          // Correctly uses "title" as the key
          onChange={(e) => onChange("title", e.target.value)}
          className={inputClass}
          disabled={isViewMode}
        />
      </FormField>

      {/* Lesson Count + Duration Minutes */}
      <div className=" w-full grid grid-cols-2 gap-4">
        <FormField label="Lesson Count" error={errors?.lessonCount}>
          <input
            placeholder="write here..."
            type="number"
            name="lessonCount"
            value={formData.lessonCount || ""}
            // Correctly uses "lessonCount" and passes value as a number
            onChange={(e) => onChange("lessonCount", e.target.valueAsNumber)}
            className={inputClass}
            disabled={isViewMode}
            min="0"
          />
        </FormField>

        <FormField label="Duration (minutes)" error={errors?.durationMinutes}>
          <input
            placeholder="write here..."
            type="number"
            name="durationMinutes"
            value={formData.durationMinutes || ""}
            // Correctly uses "durationMinutes" and passes value as a number
            onChange={(e) =>
              onChange("durationMinutes", e.target.valueAsNumber)
            }
            className={inputClass}
            disabled={isViewMode}
            min="0"
          />
        </FormField>
      </div>
    </div>
  );
}
