import { InstructorTableHeader } from "./InstructorTableHeader";
import { InstructorTableBody } from "./InstructorTableBody";

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
      <InstructorTableHeader />
      <InstructorTableBody rows={rows} />
    </table>
  );
}
