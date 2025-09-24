import { FiSearch } from "react-icons/fi";

interface TableToolBarProps {
  onAddClick: () => void;
  onSearch: (query: string) => void;
}

export function TableToolBar({ onAddClick, onSearch }: TableToolBarProps) {
  return (
    <div className="flex items-center justify-between font-bold text-2xl px-8 py-8">
      <div className="flex items-center">
        Instructors
        <span className="ml-2 text-base text-gray-500 bg-gray-200 rounded-2xl px-2 py-1">
          200
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

        {/* search bar */}
        <div className="flex items-center relative">
          <input
            type="search"
            placeholder="name , job title"
            className=" border border-gray-300 rounded-xl pl-10 pr-4 py-2 h-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={20}
          />
        </div>
      </div>
    </div>
  );
}
