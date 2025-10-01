import { MdOutlineRemoveRedEye as ViewIcon } from "react-icons/md";
import { CiEdit as EditIcon } from "react-icons/ci";
import { FiTrash as DeleteIcon } from "react-icons/fi";

interface ActionColumnProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ActionColumn({ onView, onEdit, onDelete }: ActionColumnProps) {
  const iconButtonClass = "p-1 rounded hover:bg-gray-50 cursor-pointer";

  return (
    <div className="flex flex-1 gap-3 justify-center">
      <button
        onClick={onView}
        className="p-2 bg-white hover:bg-gray-100 rounded-lg shadow-sm transition-colors"
      >
        <ViewIcon className="text-blue-400" size={20} />
      </button>
      <button
        onClick={onEdit}
        className="p-2 bg-white hover:bg-gray-100 rounded-lg shadow-sm transition-colors"
      >
        <EditIcon className="text-blue-400" size={20} />
      </button>
      <button
        onClick={onDelete}
        className="p-2 bg-white hover:bg-gray-100 rounded-lg shadow-sm transition-colors"
      >
        <DeleteIcon className="text-red-500" size={20} />
      </button>
    </div>
  );
}
