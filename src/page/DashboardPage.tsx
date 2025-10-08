import "@/index.css";
import { FaRegUser } from "react-icons/fa";
import { IoMdListBox } from "react-icons/io";
import { BsCollection } from "react-icons/bs";

import StatCard from "@components/Dashboard/StatCard";
import Statistics from "@components/Dashboard/Statistics";
import { LoadingSpinner } from "@components/UI/LoadingSpinner";
import { ErrorMessage } from "@components/UI/ErrorMessage";

import { useDashboardSummary } from "@/hooks/useDashboardSummary";

export default function Dashboard() {
  const { data: summary, isLoading, error, refetch } = useDashboardSummary();

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <ErrorMessage message="Failed to load summary" onRetry={refetch} />;

  return (
    <div className="flex-1 p-8 bg-gray-50 w-full h-full">
      <div className="text-4xl"> Dashboard </div>
      <hr className="border-gray-400 my-6" />

      {/* Section 1 */}
      <div className="grid grid-cols-3 gap-8 ml-4 mt-6 mb-10">
        {summary && (
          <StatCard
            number={summary.instructorsCount}
            label="Instructors"
            icon={<FaRegUser size={24} />}
          />
        )}
        {summary && (
          <StatCard
            number={summary.categoriesCount}
            label="Categories"
            icon={<IoMdListBox size={24} />}
          />
        )}
        {summary && (
          <StatCard
            number={summary.coursesCount}
            label="Courses"
            icon={<BsCollection size={24} />}
          />
        )}
      </div>

      {/* Section 2*/}
      <div className="grid grid-cols-[4fr_3fr] gap-8 ml-4 mt-6">
        <div>
          {summary && (
            <Statistics
              data={[
                { name: "Instructors", value: summary.instructorsCount },
                { name: "Categories", value: summary.categoriesCount },
                { name: "Courses", value: summary.coursesCount },
              ]}
            />
          )}
        </div>
        <div>
          {summary && (
            <Statistics
              data={[
                { name: "Instructors", value: summary.instructorsCount },
                { name: "Categories", value: summary.categoriesCount },
                { name: "Courses", value: summary.coursesCount },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
