type SelectMenuProps = {
  label?: string;
  currentSelection: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export default function SelectMenu({
  label,
  currentSelection: value,
  onChange,
  children,
  disabled,
}: SelectMenuProps) {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-3 
        text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
      >
        <option value="" disabled>
          Choose one
        </option>
        {children}
      </select>
    </div>
  );
}
