import type { category } from "../../types/category";
import { SearchBar } from "../UI/SearchBar";
import SelectMenu from "../UI/SelectMenu";

interface CourseToolBarProps {
  onAddClick: () => void;
  onSearch: (query: string) => void;
  onCateogryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  CoursesCount: number;
  cateogryOptions: category[];
  currentSelectedCateogryId: number | "";
}

export function CourseToolBar({
  onAddClick,
  onSearch,
  CoursesCount,
  cateogryOptions,
  currentSelectedCateogryId,
  onCateogryChange,
}: CourseToolBarProps) {
  return (
    <div className="flex items-center justify-between font-bold text-2xl px-8 py-8">
      <div className="flex items-center">
        Courses
        <span className="ml-2 text-base text-gray-500 bg-gray-200 rounded-2xl px-2 py-1">
          {CoursesCount}
        </span>
      </div>

      <div className="flex gap-4">
        <button
          className="text-white text-base font-normal px-4 py-2 bg-black rounded-2xl hover:bg-gray-800 transition-colors"
          onClick={onAddClick}
        >
          Add Course
        </button>

        <SelectMenu
          currentSelection={currentSelectedCateogryId}
          onChange={onCateogryChange}
        >
          {cateogryOptions.map((cateogry) => (
            <option key={cateogry.categoryId} value={cateogry.categoryId}>
              {cateogry.name}
            </option>
          ))}
        </SelectMenu>
        <SearchBar onSearch={onSearch} placeholder="title" />
      </div>
    </div>
  );
}
