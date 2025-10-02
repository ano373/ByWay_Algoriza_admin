import { useParams } from "react-router-dom";
interface CourseFormPageProps {
  mode: "view" | "edit" | "add";
}

export function CourseFormPage({ mode }: CourseFormPageProps) {
  const { courseId } = useParams<{ courseId: string }>();

  return (
    <div>
      Course Form Page - {mode} {courseId}
    </div>
  );
}
