import { useState } from "react";
import type { Instructor } from "../types/Instrcutor";

type ModalType =
  | { type: "view"; instructor: Instructor }
  | { type: "edit"; instructor: Instructor }
  | { type: "delete"; id: number; name: string }
  | { type: "add" }
  | null;

export const useInstructorModals = () => {
  const [modal, setModal] = useState<ModalType>(null);

  const openView = (instructor: Instructor) =>
    setModal({ type: "view", instructor });

  const openEdit = (instructor: Instructor) =>
    setModal({ type: "edit", instructor });

  const openDelete = (id: number, name: string) =>
    setModal({ type: "delete", id, name });

  const openAdd = () => setModal({ type: "add" });

  const close = () => setModal(null);

  return {
    modal,
    actions: { openView, openEdit, openDelete, openAdd },
    close,
  };
};
