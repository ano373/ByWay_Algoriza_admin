import { InstructorTable } from "../components/Instructor/table/InstructorTable";
import { ActionColumn } from "../components/UI/ActionColumn";
import { StarRating } from "../components/UI/StarRating";
import { useCallback, useMemo, useState } from "react";
import { InstructorTableToolBar } from "../components/Instructor/table/InstructorTableToolBar";
import {
  JobTitles,
  type Instructor,
  type InstructorFormData,
  type InstructorPaginationQuery,
} from "../types/Instrcutor";

import Modal from "../components/UI/Modal";
import { DeletePrompt } from "../components/UI/DeletePrompt";
import InstructorForm from "../components/Instructor/InstructorForm";
import { useInstructorModals } from "../hooks/useInstructorModals";
import { DashboardApi } from "../api/DashboardApi";
import {
  useAddInstructor,
  useDeleteInstructor,
  useInstructors,
  useUpdateInstructor,
} from "../hooks/instructor.hooks";
import { LoadingSpinner } from "../components/UI/LoadingSpinner";
import { ErrorMessage } from "../components/UI/ErrorMessage";
import { Pagination } from "../components/UI/Pagination";

export default function InstructorsPage() {
  const { data: summary } = DashboardApi.useSummary();
  const deleteInstructorMutation = useDeleteInstructor();
  const updateInstructorMutation = useUpdateInstructor();
  const addInstructorMutation = useAddInstructor();

  const [InstructorPaginationQuery, setInstructorPaginationQuery] =
    useState<InstructorPaginationQuery>({
      page: 1,
      limit: 10,
      search: "",
    });
  const { data, isLoading, isError } = useInstructors(
    InstructorPaginationQuery
  );

  const { states, actions, closers } = useInstructorModals();
  const instructors = data?.value ?? [];
  //  const meta = data?.meta;

  const tableRows = useMemo(() => {
    return instructors.map((instructor: Instructor) => ({
      name: instructor.name,
      jobTitle: JobTitles.toLabel(instructor.jobTitle),
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
  }, [instructors]);

  const handleConfirmDelete = useCallback(async () => {
    if (!states.deleteInstructor) return;

    deleteInstructorMutation.mutate(states.deleteInstructor.id, {
      onSuccess: () => {
        closers.closeDelete();
      },
      onError: (error) => {
        console.error("Failed to delete instructor:", error);
      },
      onSettled: () => {
        closers.closeDelete();
      },
    });
  }, [states.deleteInstructor, deleteInstructorMutation, closers]);

  const handleEditInstructor = async (data: InstructorFormData) => {
    updateInstructorMutation.mutate(data, {
      onSuccess: () => {
        closers.closeEdit();
      },
      onError: (error) => {
        console.error("Failed to update instructor:", error);
      },
    });
  };

  const handleAddInstructor = async (data: InstructorFormData) => {
    addInstructorMutation.mutate(data, {
      onSuccess: () => {
        closers.closeAdd();
      },
      onError: (error) => {
        console.error("Failed to add instructor:", error);
      },
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message="Failed to load Instructors" />;

  return (
    <div className=" flex flex-col flex-1 w-full h-full bg-[#fcfcfc] rounded-4xl shadow-lg">
      <div className="text-4xl px-6 pt-6"> Courses </div>
      <hr className="border-gray-400 my-6" />
      <InstructorTableToolBar
        onAddClick={actions.openAdd}
        onSearch={(query: string) =>
          setInstructorPaginationQuery((prev) => ({
            ...prev,
            search: query,
            page: 1,
          }))
        }
        InstructorsCount={summary?.instructorsCount ?? 0}
      />
      <InstructorTable rows={tableRows} />
      <div className="border-t border-gray-200 p-4 mt-auto">
        <Pagination
          currentPage={InstructorPaginationQuery.page ?? 1}
          totalPages={3}
          onPageChange={(page) =>
            setInstructorPaginationQuery((prev) => ({ ...prev, page }))
          }
        />
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
