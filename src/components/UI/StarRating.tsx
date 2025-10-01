import { FaStar } from "react-icons/fa";

type StarRatingProps = {
  value: number;
  editable?: boolean;
  onChange?: (newValue: number) => void;
};

export function StarRating({ value, editable, onChange }: StarRatingProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(5)].map((_, i) => {
        const starIndex = i + 1;
        return (
          <FaStar
            key={starIndex}
            className={`w-6 h-6 transition-colors ${
              starIndex <= value ? "text-yellow-400" : "text-gray-300"
            } ${
              editable ? "cursor-pointer hover:scale-110" : "cursor-default"
            }`}
            onClick={() => {
              if (editable && onChange) {
                onChange(starIndex);
              }
            }}
          />
        );
      })}
    </div>
  );
}
