import { InstructorTable } from "../components/Instructor/table/InstructorTable";
import { ActionColumn } from "../components/UI/ActionColumn";
import { StarRating } from "../components/Instructor/StarRating";
import { useCallback, useMemo } from "react";
import { TableToolBar } from "../components/Instructor/table/TableToolBar";
import type { Instructor, InstructorFormData } from "../types/Instrcutor";
import { useInstructors } from "../hooks/useInsturctors";
import { RiNumber1, RiNumber2 } from "react-icons/ri";
import Modal from "../components/Instructor/Modal";
import { InstructorApi } from "../api/InstructorApi";
import { DeletePrompt } from "../components/UI/DeletePrompt";
import InstructorForm from "../components/Instructor/InstructorForm";
import { useInstructorModals } from "../hooks/useInstructorModals";

export default function InstructorsPage() {
  const { instructors, setInstructors, isLoading, error, page, setPage, meta } =
    useInstructors();
  const { states, actions, closers } = useInstructorModals();

  const handleConfirmDelete = useCallback(async () => {
    if (!states.deleteInstructor) return;

    try {
      await InstructorApi.deleteInstructor(states.deleteInstructor.id);
      setInstructors((instructors) =>
        instructors.filter(
          (inst) => inst.instructorId !== states.deleteInstructor!.id
        )
      );
    } catch (error) {
      console.error("Failed to delete instructor:", error);
    } finally {
      closers.closeDelete();
    }
  }, [states.deleteInstructor, setInstructors, closers]);

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
      closers.closeEdit();
    } catch (error) {
      console.error("Failed to update instructor:", error);
    }
  };

  const handleAddInstructor = async (data: InstructorFormData) => {
    try {
      const created = await InstructorApi.addInstructor(data);
      setInstructors((instructors) => [...instructors, created]);
      closers.closeAdd();
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
          onView={() => actions.openView(instructor)}
          onEdit={() => actions.openEdit(instructor)}
          onDelete={() =>
            actions.openDelete(instructor.instructorId, instructor.name)
          }
        />
      ),
    }));
  }, [instructors, actions]);

  return (
    <div className="flex-1 p-8 bg-gray-50 w-full h-full">
      <div className="text-4xl">Instructors</div>
      <hr className="border-gray-400 my-10" />
      <RiNumber1 size={22} onClick={() => setPage(1)} />
      <RiNumber2 size={22} onClick={() => setPage(2)} />

      <div className="flex flex-col flex-1 w-full h-full bg-white rounded-4xl shadow-lg">
        <TableToolBar
          onAddClick={actions.openAdd}
          onSearch={function (query: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        <InstructorTable rows={tableRows} />
      </div>

      {/* Modal Logic */}
      {states.deleteInstructor && (
        <Modal open={true} onClose={closers.closeDelete}>
          <DeletePrompt
            label="Instructor"
            name={states.deleteInstructor.name}
            onConfirm={handleConfirmDelete}
            onCancel={closers.closeDelete}
          />
        </Modal>
      )}

      {states.viewInstructor && (
        <Modal open={true} onClose={closers.closeView}>
          <InstructorForm
            initialData={states.viewInstructor.Instructor}
            mode="view"
            onClose={closers.closeView}
          />
        </Modal>
      )}

      {states.editInstructor && (
        <Modal open={true} onClose={closers.closeEdit}>
          <InstructorForm
            initialData={states.editInstructor.Instructor}
            mode="edit"
            onClose={closers.closeEdit}
            onSubmit={handleEditInstructor}
          />
        </Modal>
      )}

      {states.addInstructor && (
        <Modal open={true} onClose={closers.closeAdd}>
          <InstructorForm
            onSubmit={handleAddInstructor}
            mode="add"
            onClose={closers.closeAdd}
          />
        </Modal>
      )}
    </div>
  );
}
