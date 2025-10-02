import { useParams } from "react-router-dom";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

interface CourseFormPageProps {
  mode: "view" | "edit" | "add";
}

export function CourseFormPage({ mode }: CourseFormPageProps) {
  const { courseId } = useParams<{ courseId: string }>();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleNext = () => {
    // validation before moving to step 2
    setStep(2);
  };
  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", form);
  };
  //  Course Form Page - {mode} {courseId}
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
          Add course
          <span className="text-lg text-gray-500 ml-4">Step {step} of 2</span>
        </div>

        {step === 1 && (
          <div>
            <h1 className="font-primary  text-gray-700 text-2xl mt-4  mb-2">
              Course Details
            </h1>
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h1 className="font-primary  text-gray-700 text-2xl mt-4  mb-2">
              Add Content
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
