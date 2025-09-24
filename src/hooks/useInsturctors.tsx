import { useState, useEffect } from "react";
import { InstructorApi } from "../api/InstructorApi";
import type { Instructor } from "../types/Instrcutor";
import type { Meta } from "../types/general";

export const useInstructors = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const loadInstructors = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await InstructorApi.fetchInstructors(page);
        setInstructors(response.data);
        setMeta(response.meta);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadInstructors();
  }, [page]);

  return { instructors, setInstructors, meta, isLoading, error, page, setPage };
};
