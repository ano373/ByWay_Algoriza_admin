export function InstructorTableHeader() {
  const columns = ["Name", "Job Title", "Rate", "Action"];
  return (
    <thead className="bg-primary ">
      <tr>
        {columns.map((col) => (
          <th
            key={col}
            className="px-6 py-4 text-center  text-gray-700 font-semibold  text-sm"
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}
