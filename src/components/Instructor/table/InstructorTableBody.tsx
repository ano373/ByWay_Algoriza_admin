import { ActionColumn } from "@/components/UI/ActionColumn";
import { StarRating } from "@/components/UI/StarRating";
import { type Instructor, JobTitles } from "@/types/Instrcutor";

interface TableBodyProps {
  instructors: Instructor[];
  actions: {
    openEdit: (instructor: Instructor) => void;
    openView: (instructor: Instructor) => void;
    openDelete: (id: number, name: string) => void;
  };
}

export function InstructorTableBody({ instructors, actions }: TableBodyProps) {
  return (
    <tbody>
      {instructors.map((instructor) => (
        <tr
          key={instructor.instructorId}
          className="border-b border-b-gray-200 hover:bg-gray-50"
        >
          <td className="px-6 py-2 text-center">{instructor.name}</td>
          <td className="px-6 py-2 text-center">
            {JobTitles.toLabel(instructor.jobTitle)}
          </td>
          <td className="px-6 py-2 text-center">
            <StarRating value={instructor.rating} editable={false} />
          </td>
          <td className="px-6 py-2 text-center items-center">
            <ActionColumn
              onView={() => actions.openView(instructor)}
              onEdit={() => actions.openEdit(instructor)}
              onDelete={() =>
                actions.openDelete(instructor.instructorId, instructor.name)
              }
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
