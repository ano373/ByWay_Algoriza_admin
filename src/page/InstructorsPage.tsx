import { InstructorTable } from "../components/Instructor/table/InstructorTable";
import { useCallback, useState } from "react";
import { InstructorTableToolBar } from "../components/Instructor/table/InstructorTableToolBar";
import {
  type InstructorRequest,
  type InstructorPaginationParameter,
} from "../types/Instrcutor";

import Modal from "../components/UI/Modal";
import { DeletePrompt } from "../components/UI/DeletePrompt";
import InstructorForm from "../components/Instructor/InstructorForm";
import { useInstructorModals } from "../hooks/useInstructorModals";

import {
  useAddInstructor,
  useDeleteInstructor,
  useInstructors,
  useUpdateInstructor,
} from "../hooks/useInstructor";
import { LoadingSpinner } from "../components/UI/LoadingSpinner";
import { ErrorMessage } from "../components/UI/ErrorMessage";
import { Pagination } from "../components/UI/Pagination";
import { useDashboardSummary } from "../hooks/useDashboardSummary";

export default function InstructorsPage() {
  const { data: summary } = useDashboardSummary();
  const deleteInstructorMutation = useDeleteInstructor();
  const updateInstructorMutation = useUpdateInstructor();
  const addInstructorMutation = useAddInstructor();

  const [InstructorPaginationQuery, setInstructorPaginationQuery] =
    useState<InstructorPaginationParameter>();
  const { data, isLoading, isError } = useInstructors(
    InstructorPaginationQuery
  );
  const instructors = data?.value ?? [];

  const { modal, actions, close } = useInstructorModals();
  //  const meta = data?.meta;

  const handleConfirmDelete = useCallback(async () => {
    if (!modal || modal.type !== "delete") return;

    deleteInstructorMutation.mutate(modal.id, {
      onSettled: () => {
        close();
      },
    });
  }, [modal, deleteInstructorMutation, close]);

  const handleEditInstructor = async (data: InstructorRequest) => {
    updateInstructorMutation.mutate(data, {
      onSettled: () => {
        close();
      },
    });
  };

  const handleAddInstructor = async (data: InstructorRequest) => {
    addInstructorMutation.mutate(data, {
      onSettled: () => {
        close();
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
      <InstructorTable instructors={instructors} actions={actions} />
      <div className="border-t border-gray-200 p-4 mt-auto">
        <Pagination
          currentPage={InstructorPaginationQuery?.page ?? 1}
          totalPages={3}
          onPageChange={(page) =>
            setInstructorPaginationQuery((prev) => ({ ...prev, page }))
          }
        />
      </div>

      {/* Modal Logic */}
      {modal && (
        <Modal open={true} onClose={close}>
          {modal.type === "delete" && (
            <DeletePrompt
              label="Instructor"
              name={modal.name}
              onConfirm={handleConfirmDelete}
              onCancel={close}
            />
          )}
          {modal.type === "view" && (
            <InstructorForm
              initialData={modal.instructor}
              mode="view"
              onClose={close}
            />
          )}
          {modal.type === "edit" && (
            <InstructorForm
              initialData={modal.instructor}
              mode="edit"
              onClose={close}
              onSubmit={handleEditInstructor}
            />
          )}
          {modal.type === "add" && (
            <InstructorForm
              onSubmit={handleAddInstructor}
              mode="add"
              onClose={close}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
