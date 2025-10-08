import { IoAddCircleOutline } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import type { CourseSection } from "@/types/course";
import { ContentCard } from "./ContentCard";

type FormMode = "add" | "edit" | "view";
type SectionError = Partial<Record<keyof CourseSection, string>>;

interface CourseContentFormProps {
  sections: CourseSection[];
  onChange: (sections: CourseSection[]) => void;
  errors: SectionError[];
  mode: FormMode;
}

export function CourseContentForm({
  sections,
  onChange,
  errors,
  mode,
}: CourseContentFormProps) {
  const isViewMode = mode === "view";

  function addSection() {
    if (isViewMode) return;
    onChange([
      ...sections,
      {
        localId: Date.now(),
        title: "",
        lessonCount: 0,
        durationMinutes: 0,
      },
    ]);
  }

  function removeSection(index: number) {
    if (isViewMode || sections.length <= 1) return;
    onChange(sections.filter((_, i) => i !== index));
  }

  function updateSection(
    index: number,
    field: keyof CourseSection,
    value: string | number
  ) {
    if (isViewMode) return;
    onChange(
      sections.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  }

  return (
    <div className="w-full mx-auto p-4 space-y-6">
      <div className="space-y-4 w-full">
        {sections.map((section, index) => (
          <div key={section.localId} className="flex flex-col w-full gap-3">
            <ContentCard
              formData={section}
              onChange={(field, value) => updateSection(index, field, value)}
              errors={errors[index] || {}}
              mode={mode}
            />

            {index > 0 && !isViewMode && (
              <button
                type="button"
                onClick={() => removeSection(index)}
                className={`self-start flex items-center justify-center h-10 w-10 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors ${
                  isViewMode ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Remove this section"
                disabled={isViewMode}
              >
                <FaTrashAlt size={18} />
              </button>
            )}
          </div>
        ))}
      </div>

      {!isViewMode && (
        <button
          type="button"
          onClick={addSection}
          className="w-full flex items-center justify-center gap-2 p-3 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors"
        >
          <IoAddCircleOutline size={34} />
          Add Another Section
        </button>
      )}
    </div>
  );
}
