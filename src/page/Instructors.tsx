import { InstructorTable } from "../components/Instructor/table/InstructorTable";
import { ActionColumn } from "../components/UI/ActionColumn";
import { StarRating } from "../components/Instructor/StarRating";
import { useCallback, useMemo, useState } from "react";
import { TableToolBar } from "../components/Instructor/table/TableToolBar";
import type { Instructor, InstructorFormData } from "../types/Instrcutor";
import { useInstructors } from "../hooks/useInsturctors";
import { RiNumber1, RiNumber2 } from "react-icons/ri";
import Modal from "../components/Instructor/Modal";
import { InstructorApi } from "../api/InstructorApi";
import { DeletePrompt } from "../components/UI/DeletePrompt";
import InstructorForm from "../components/Instructor/InstructorForm";

export default function InstructorsPage() {
  const [editInstructor, setEditInstructor] = useState<{
    Instructor: Instructor;
  } | null>(null);

  const [viewInstructor, setViewInstructor] = useState<{
    Instructor: Instructor;
  } | null>(null);

  const [deleteInstructor, setDeleteInstructor] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [addInstructor, setAddInstructor] = useState<boolean>(false);

  const { instructors, setInstructors, isLoading, error, page, setPage, meta } =
    useInstructors();

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteInstructor) return;

    try {
      await InstructorApi.deleteInstructor(deleteInstructor.id);

      setInstructors((instructors) =>
        instructors.filter((inst) => inst.instructorId !== deleteInstructor.id)
      );
    } catch (error) {
      console.error("Failed to delete instructor:", error);
    } finally {
      setDeleteInstructor(null);
    }
  }, [deleteInstructor, setInstructors]);

  const handleEditInstructor = async (data: InstructorFormData) => {
    try {
      const updatedInstructor = await InstructorApi.updateInstructor(data);
      setInstructors((instructors) =>
        instructors.map((inst) =>
          inst.instructorId === updatedInstructor.instructorId
            ? updatedInstructor
            : inst
        )
      );
    } catch (error) {
      console.error("Failed to update instructor:", error);
    }
  };

  const handleAddInstructor = async (data: InstructorFormData) => {
    try {
      const created = await InstructorApi.addInstructor(data);
      setInstructors((instructors) => [...instructors, created]);
    } catch (error) {
      console.error("Failed to add instructor:", error);
    }
  };

  const tableRows = useMemo(() => {
    return instructors.map((instructor: Instructor) => ({
      name: instructor.name,
      jobTitle: instructor.jobTitle,
      Rate: <StarRating value={instructor.rating} editable={false} />,
      Action: (
        <ActionColumn
          onView={() =>
            setViewInstructor({
              Instructor: instructor,
            })
          }
          onEdit={() =>
            setEditInstructor({
              Instructor: instructor,
            })
          }
          onDelete={() =>
            setDeleteInstructor({
              id: instructor.instructorId,
              name: instructor.name,
            })
          }
        />
      ),
    }));
  }, [instructors]);

  return (
    <div className="flex-1 p-8 bg-gray-50 w-full h-full">
      <div className="text-4xl"> Instructors </div>
      <hr className="border-gray-400 my-10 " />
      <RiNumber1 size={22} onClick={() => setPage(1)} />
      <RiNumber2 size={22} onClick={() => setPage(2)} />

      <div className="flex flex-col flex-1 w-full h-full bg-white rounded-4xl shadow-lg ">
        <TableToolBar
          onAddClick={() => setAddInstructor(true)}
          onSearch={function (query: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        <InstructorTable rows={tableRows} />
      </div>

      {/* user action logic */}
      {deleteInstructor && (
        <Modal open={true} onClose={() => setDeleteInstructor(null)}>
          <DeletePrompt
            label="Instructor"
            name={deleteInstructor.name}
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeleteInstructor(null)}
          />
        </Modal>
      )}

      {viewInstructor && (
        <Modal open={true} onClose={() => setViewInstructor(null)}>
          <InstructorForm
            initialData={viewInstructor.Instructor}
            mode="view"
            onClose={() => setViewInstructor(null)}
          />
        </Modal>
      )}

      {editInstructor && (
        <Modal open={true} onClose={() => setEditInstructor(null)}>
          <InstructorForm
            initialData={editInstructor.Instructor}
            mode="edit"
            onClose={() => setEditInstructor(null)}
            onSubmit={handleEditInstructor}
          />
        </Modal>
      )}

      {addInstructor && (
        <Modal open={true} onClose={() => setAddInstructor(false)}>
          <InstructorForm
            onSubmit={handleAddInstructor}
            mode="add"
            onClose={() => setAddInstructor(false)}
          />
        </Modal>
      )}
    </div>
  );
}
