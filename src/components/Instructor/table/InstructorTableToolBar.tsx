import { SearchBar } from "@/components/UI/SearchBar";

interface InstructorTableToolBar {
  onAddClick: () => void;
  onSearch: (query: string) => void;
  InstructorsCount: number;
}

export function InstructorTableToolBar({
  onAddClick,
  onSearch,
  InstructorsCount,
}: InstructorTableToolBar) {
  return (
    <div className="flex items-center justify-between font-bold text-2xl px-8 py-8">
      <div className="flex items-center">
        Instructors
        <span className="ml-2 text-base text-gray-500 bg-gray-200 rounded-2xl px-2 py-1">
          {InstructorsCount}
        </span>
      </div>

      <div className="flex gap-4">
        {/* add instructor modal */}
        <button
          className=" font-primary font-normal px-4 py-2 primary-black-button"
          onClick={onAddClick}
        >
          Add Instructor
        </button>
        <SearchBar onSearch={onSearch} placeholder="name, job title" />
      </div>
    </div>
  );
}
