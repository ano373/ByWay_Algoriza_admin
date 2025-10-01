import { SearchBar } from "../../UI/SearchBar";

interface TableToolBarProps {
  onAddClick: () => void;
  onSearch: (query: string) => void;
  InstructorsCount: number;
}

export function TableToolBar({
  onAddClick,
  onSearch,
  InstructorsCount,
}: TableToolBarProps) {
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
          className="text-white text-base font-normal px-4 py-2 bg-black rounded-2xl hover:bg-gray-800 transition-colors"
          onClick={onAddClick}
        >
          Add Instructor
        </button>
        <SearchBar onSearch={onSearch} placeholder="name, job title" />
      </div>
    </div>
  );
}
