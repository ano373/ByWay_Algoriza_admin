import { useParams } from "react-router-dom";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { CourseDetailsForm } from "../components/Course/CourseDetailsForm";
import type { CourseRequest } from "../types/course";
import { useCourseFormValidation } from "../hooks/useCourseFormValidation";
import { useCategories } from "../hooks/useCategories";
import { useInstructors } from "../hooks/instructor.hooks";
import { useCourse } from "../hooks/course.hooks";

interface CourseFormPageProps {
  mode: "view" | "edit" | "add";
}

export function CourseFormPage({ mode }: CourseFormPageProps) {
  const { courseId } = useParams<{ courseId: string }>();

  const {
    data: CourseDetails,
    isLoading,
    isError,
    error,
  } = useCourse(parseInt(courseId!, 10));

  const [step, setStep] = useState(1);
  const [formData, SetFormData] = useState<CourseRequest>({
    title: "",
    level: "",
    rating: 0,
    price: 0,
    description: "",
    certification: "",
    instructorId: 0,
    categoryId: 0,
    thumbnailUrl: "",
    sections: [],
  });

  const { errors, validateInput } = useCourseFormValidation(formData);

  const { data: categories } = useCategories();
  const CategoriesOptions = categories?.value;

  const { data: instructors } = useInstructors();
  const instructorOptions = instructors?.value;

  const handleNext = () => {
    if (validateInput(step, formData)) {
      setStep(step + 1);
    }
  };

  const handleChange = (field: keyof CourseRequest, value: unknown) => {
    SetFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };
  //  Course Form Page - {mode} {courseId}

  if (isLoading) {
    return <div>Loading course...</div>;
  }

  if (isError) {
    return <div>Course not found or error loading course</div>;
  }
  return (
    <div className="flex-1 p-8 bg-gray-50  w-full h-full">
      <div className="text-4xl"> Courses </div>
      <hr className="border-gray-400 my-6" />
      <div className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
        {/* page header */}
        <div className="font-primary text-3xl flex items-center">
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
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
            <h1 className="font-primary  text-gray-700 text-2xl mt-4  mb-2">
              Course Details
            </h1>
            <CourseDetailsForm
              formData={formData}
              onChange={handleChange}
              categoryOptions={CategoriesOptions || []}
              instructorOptions={instructorOptions || []}
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
            <h1 className="font-primary  text-gray-700 text-2xl mt-4  mb-2">
              {mode} Content
            </h1>
            <h2 className="font-bold mb-2">Step 2: Course Content</h2>
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
            <button
              onClick={handleBack}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
