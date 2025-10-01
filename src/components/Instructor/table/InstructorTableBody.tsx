interface TableBodyProps {
  rows: {
    name: string;
    jobTitle: string;
    Rate: React.ReactNode;
    Action: React.ReactNode;
  }[];
}

export function InstructorTableBody({ rows }: TableBodyProps) {
  return (
    <tbody>
      {rows.map((item, index) => (
        <tr key={index} className="border-b border-b-gray-200 hover:bg-gray-50">
          <td className="px-6 py-2 text-center ">{item.name}</td>
          <td className="px-6 py-2 text-center ">{item.jobTitle}</td>
          <td className="px-6 py-2 text-center ">{item.Rate}</td>
          <td className="px-6 py-2 text-center items-center">{item.Action}</td>
        </tr>
      ))}
    </tbody>
  );
}
