import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { CourseDetailsForm } from "../components/Course/CourseDetailsForm";
import { useCategories } from "../hooks/useCategories";
import { useInstructors } from "../hooks/useInstructor";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import { useCourseSubmit } from "../hooks/useCourseSubmit";
import { CourseContentForm } from "../components/Course/CourseContentForm";
import { useEffect } from "react";

interface CourseFormPageProps {
  mode: "view" | "edit" | "add";
}

export function CourseFormPage({ mode }: CourseFormPageProps) {
  const { courseId: id } = useParams<{ courseId: string }>();
  const courseId = id ? Number(id) : NaN;
  const isAddMode = mode === "add";
  const isViewMode = mode === "view";

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAddMode && isNaN(courseId)) {
      navigate("/404", { replace: true });
    }
  }, [courseId, navigate]);

  const {
    step,
    formData,
    handleChange,
    handleNext,
    handleBack,
    isLoading,
    isError,
    courseErrors,
    sectionErrors,
    validateForm,
    getPayload,
  } = useMultiStepForm(mode, courseId);

  const { handleSubmit, isSubmitting } = useCourseSubmit(mode, courseId);

  const { data: categories } = useCategories();
  const categoryOptions = categories?.value || [];

  const { data: instructors } = useInstructors();
  const instructorOptions = instructors?.value || [];

  const onSubmit = async () => {
    if (!validateForm()) return;
    const payload = getPayload();
    await handleSubmit(payload);
  };

  const handleCancel = () => {
    navigate(-1);
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
              errors={courseErrors}
              mode={mode}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="primary-red-button"
              >
                Cancel
              </button>
              <button
                onClick={handleNext}
                className="primary-black-button flex-1"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <div>
            <h1 className="font-primary text-gray-700 text-2xl mt-4 mb-2">
              {mode} Content
            </h1>
            <CourseContentForm
              sections={formData.sections}
              onChange={(newSections) => handleChange("sections", newSections)}
              errors={sectionErrors}
              mode={mode}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="primary-red-button "
              >
                Cancel
              </button>
              {!isViewMode && (
                <button
                  onClick={onSubmit}
                  disabled={isSubmitting}
                  className="primary-black-button flex-1 text-2xl"
                >
                  {isSubmitting ? "Submitting..." : "Add"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
