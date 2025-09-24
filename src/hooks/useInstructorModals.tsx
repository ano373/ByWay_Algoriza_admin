import { useState } from "react";
import type { Instructor } from "../types/Instrcutor";

export const useInstructorModals = () => {
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

  const openEdit = (instructor: Instructor) =>
    setEditInstructor({ Instructor: instructor });
  const openView = (instructor: Instructor) =>
    setViewInstructor({ Instructor: instructor });
  const openDelete = (id: number, name: string) =>
    setDeleteInstructor({ id, name });
  const openAdd = () => setAddInstructor(true);

  const closeEdit = () => setEditInstructor(null);
  const closeView = () => setViewInstructor(null);
  const closeDelete = () => setDeleteInstructor(null);
  const closeAdd = () => setAddInstructor(false);

  return {
    states: { editInstructor, viewInstructor, deleteInstructor, addInstructor },
    actions: { openEdit, openView, openDelete, openAdd },
    closers: { closeEdit, closeView, closeDelete, closeAdd },
  };
};
