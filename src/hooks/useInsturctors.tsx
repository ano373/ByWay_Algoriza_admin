import { useState, useEffect } from "react";
import { InstructorApi } from "../api/InstructorApi";
import type { Instructor } from "../types/Instrcutor";
// import type { Meta } from "../types/general";
import type { InstructorPaginationQuery } from "../types/Instrcutor";

export const useInstructors = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  // const [meta, setMeta] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [InstructorPaginationQuery, setInstructorPaginationQuery] =
    useState<InstructorPaginationQuery>({
      page: 1,
      limit: 10,
      search: "",
    });

  useEffect(() => {
    const loadInstructors = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await InstructorApi.fetchInstructors(
          InstructorPaginationQuery
        );
        console.log(response);
        setInstructors(Array.isArray(response.value) ? response.value : []);
        // setMeta(response.meta);
      } catch (err) {
        setInstructors([]); // fallback to empty array on error
        if (err instanceof Error) {
          setError(err.message);
        } else {
          new Error("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadInstructors();
  }, [InstructorPaginationQuery]);
  return {
    instructors,
    setInstructors,
    setInstructorPaginationQuery,
    // meta,
    isLoading,
    error,
    setError,
  };
};
