import { MdOutlineRemoveRedEye as ViewIcon } from "react-icons/md";
import { CiEdit as EditIcon } from "react-icons/ci";
import { FiTrash as DeleteIcon } from "react-icons/fi";

interface ActionColumnProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ActionColumn({ onView, onEdit, onDelete }: ActionColumnProps) {
  const iconButtonClass =
    "p-2 bg-white hover:bg-gray-100 cursor-pointer rounded-lg shadow-sm transition-colors";

  return (
    <div className="flex flex-1 gap-3 justify-center">
      <button onClick={onView} className={iconButtonClass}>
        <ViewIcon className="text-blue-400" size={20} />
      </button>
      <button onClick={onEdit} className={iconButtonClass}>
        <EditIcon className="text-blue-400" size={20} />
      </button>
      <button onClick={onDelete} className={iconButtonClass}>
        <DeleteIcon className="text-red-500" size={20} />
      </button>
    </div>
  );
}
