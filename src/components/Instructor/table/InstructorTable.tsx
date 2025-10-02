import type { Instructor } from "../../../types/Instrcutor";
import { InstructorTableBody } from "./InstructorTableBody";
import { InstructorTableHeader } from "./InstructorTableHeader";

interface InstructorsTableProps {
  instructors: Instructor[];
  actions: {
    openEdit: (instructor: Instructor) => void;
    openView: (instructor: Instructor) => void;
    openDelete: (id: number, name: string) => void;
    openAdd: () => void;
  };
}

export function InstructorTable({
  instructors,
  actions,
}: InstructorsTableProps) {
  return (
    <table className="min-w-full table-auto border border-gray-200">
      <InstructorTableHeader />
      <InstructorTableBody instructors={instructors} actions={actions} />
    </table>
  );
}
