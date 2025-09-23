type SelectMenuProps = {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
};

export default function SelectMenu({
  label,
  value,
  onChange,
  children,
}: SelectMenuProps) {
  return (
    <div className="w-64">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
      >
        <option value="" disabled>
          Choose one
        </option>
        {children}
      </select>
    </div>
  );
}
