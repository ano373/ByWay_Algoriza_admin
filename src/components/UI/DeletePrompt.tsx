import { LiaTrashSolid as DeleteIcon } from "react-icons/lia";
interface DeletePromptProps {
  label: string; // Entity type, e.g., "user", "post"
  name: string; // Actual entity name, e.g., "Ahmed"
  onConfirm: () => void; // Called when user confirms deletion
  onCancel?: () => void; // Optional, called when user cancels
}

export const DeletePrompt = ({
  label,
  name,
  onConfirm,
  onCancel,
}: DeletePromptProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 w-full rounded-xl">
      <div className="flex items-center justify-center w-30 h-30 bg-red-100 rounded-full">
        <div className="flex items-center justify-center w-20 h-20 bg-red-200 rounded-full">
          <DeleteIcon className="text-red-500" size={72} />
        </div>
      </div>

      {/* Text */}
      <div className="text-center text-lg font-medium">
        Are you sure you want to delete this {label}{" "}
        <strong className="text-2xl">{name} ?</strong>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 w-full">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-4 rounded-lg bg-gray-200 text-gray-700 text-lg hover:bg-black transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="primary-red-button flex-1"
        >
          Confirm Delete
        </button>
      </div>
    </div>
  );
};
