import { SearchBar } from "../UI/SearchBar";
import SelectMenu from "../UI/SelectMenu";

interface LevelOption {
  value: string;
  label: string;
}

interface CourseTableToolBarProps {
  onAddClick: () => void;
  onSearch: (query: string) => void;
  onLevelChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  CoursesCount: number;
  levelOptions: LevelOption[];
  selectedLevel: string;
}

export function CourseTableToolBar({
  onAddClick,
  onSearch,
  CoursesCount,
  levelOptions,
  selectedLevel,
  onLevelChange,
}: CourseTableToolBarProps) {
  return (
    <div className="flex items-center justify-between font-bold text-2xl px-8 py-8">
      <div className="flex items-center">
        Courses
        <span className="ml-2 text-base text-gray-500 bg-gray-200 rounded-2xl px-2 py-1">
          {CoursesCount}
        </span>
      </div>
      <button
        className="text-white text-base font-normal px-4 py-2 bg-black rounded-2xl hover:bg-gray-800 transition-colors"
        onClick={onAddClick}
      >
        Add Course
      </button>
      <div className="flex-1">
        <SelectMenu
          label="Level"
          value={selectedLevel}
          onChange={onLevelChange}
        >
          {levelOptions.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </SelectMenu>
      </div>
      <SearchBar onSearch={onSearch} placeholder="name" />
    </div>
  );
}
