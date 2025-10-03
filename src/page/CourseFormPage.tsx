import { useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { CourseDetailsForm } from "../components/Course/CourseDetailsForm";
import { useCategories } from "../hooks/useCategories";
import { useInstructors } from "../hooks/instructor.hooks";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import { useCourseSubmit } from "../hooks/useCourseSubmit";

interface CourseFormPageProps {
  mode: "view" | "edit" | "add";
}

export function CourseFormPage({ mode }: CourseFormPageProps) {
  const { courseId: id } = useParams<{ courseId: string }>();
  const courseId = id ? parseInt(id, 10) : undefined;
  const isAddMode = mode === "add";

  const {
    step,
    formData,
    handleChange,
    handleNext,
    handleBack,
    isLoading,
    isError,
    errors,
    validateInput,
  } = useMultiStepForm(mode, courseId);

  const { handleSubmit, isSubmitting } = useCourseSubmit(mode, courseId);

  const { data: categories } = useCategories();
  const categoryOptions = categories?.value || [];

  const { data: instructors } = useInstructors();
  const instructorOptions = instructors?.value || [];

  const onSubmit = async () => {
    if (!validateInput(step, formData)) return;
    await handleSubmit(formData);
  };

  if (!isAddMode && isLoading) {
    return <div>Loading course...</div>;
  }

  if (!isAddMode && isError) {
    return <div>Course not found or error loading course</div>;
  }

  return (
    <div className="flex-1 p-8 bg-gray-50 w-full h-full">
      <div className="text-4xl">Courses</div>
      <hr className="border-gray-400 my-6" />

      <div className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
        {/* Page header */}
        <div className="font-primary text-3xl flex items-center">
          {step === 2 && (
            <button
              onClick={handleBack}
              className="mr-3 text-gray-600 hover:text-black"
            >
              <FiArrowLeft size={24} />
            </button>
          )}
          {mode} course
          <span className="text-lg text-gray-500 ml-4">Step {step} of 2</span>
        </div>

        {step === 1 && (
          <>
            <h1 className="font-primary text-gray-700 text-2xl mt-4 mb-2">
              Course Details
            </h1>
            <CourseDetailsForm
              formData={formData}
              onChange={handleChange}
              categoryOptions={categoryOptions}
              instructorOptions={instructorOptions}
              errors={errors}
              mode={mode}
            />
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <div>
            <h1 className="font-primary text-gray-700 text-2xl mt-4 mb-2">
              {mode} Content
            </h1>
            <h2 className="font-bold mb-2">Step 2: Course Content</h2>
            <button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button
              onClick={handleBack}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
