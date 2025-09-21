import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";

interface InstructorsTableProps {
  rows: {
    name: string;
    jobTitle: string;
    Rate: React.ReactNode;
    Action: React.ReactNode;
  }[];
}

export function InstructorTable({ rows }: InstructorsTableProps) {
  return (
    <table className="min-w-full table-auto border border-gray-200  ">
      <TableHeader />
      <TableBody rows={rows} />
    </table>
  );
}
