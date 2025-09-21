import { MdOutlineRemoveRedEye as ViewIcon } from "react-icons/md";
import { CiEdit as EditIcon } from "react-icons/ci";
import { FiTrash as DeleteIcon } from "react-icons/fi";

export const ActionColumn = () => {
  const handleView = () => {
    console.log("View clicked");
  };

  const handleEdit = () => {
    console.log("Edit clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  const iconButtonClass = "p-1 rounded hover:bg-gray-50 cursor-pointer";

  return (
    <div className="flex flex-1 gap-3 justify-center">
      <button onClick={handleView} className={iconButtonClass}>
        <ViewIcon className="text-blue-400" size={20} />
      </button>
      <button onClick={handleEdit} className={iconButtonClass}>
        <EditIcon className="text-blue-400" size={20} />
      </button>
      <button onClick={handleDelete} className={iconButtonClass}>
        <DeleteIcon className="text-red-500" size={20} />
      </button>
    </div>
  );
};
