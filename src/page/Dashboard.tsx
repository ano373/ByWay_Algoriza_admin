import "../index.css";
import { FaRegUser } from "react-icons/fa";
import { IoMdListBox } from "react-icons/io";
import { BsCollection } from "react-icons/bs";

import StatCard from "../components/Dashboard/StatCard";
import Statistics from "../components/Dashboard/Statistics";

import { useEffect, useState } from "react";
import type { DashboardSummaryResponse } from "../types/dashboard";
import { DashboardApi } from "../api/DashboardApi";

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummaryResponse | null>(null);

  useEffect(() => {
    DashboardApi.fetchDashboardSummary().then(setSummary).catch(console.error);
  }, []);

  return (
    <div className="flex-1 p-8 bg-gray-50 w-full h-full">
      <div className="text-4xl"> Dashboard </div>
      <hr className="border-gray-400 my-6" />

      {/* Section 1 */}
      <div className="grid grid-cols-3 gap-8 ml-4 mt-6 mb-10">
        {summary && (
          <StatCard
            number={summary.value.instructorsCount}
            label="Instructors"
            icon={<FaRegUser size={24} />}
          />
        )}
        {summary && (
          <StatCard
            number={summary.value.categoriesCount}
            label="Categories"
            icon={<IoMdListBox size={24} />}
          />
        )}
        {summary && (
          <StatCard
            number={summary.value.coursesCount}
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
                { name: "Instructors", value: summary.value.instructorsCount },
                { name: "Categories", value: summary.value.categoriesCount },
                { name: "Courses", value: summary.value.coursesCount },
              ]}
            />
          )}
        </div>
        <div>
          {summary && (
            <Statistics
              data={[
                { name: "Instructors", value: summary.value.instructorsCount },
                { name: "Categories", value: summary.value.categoriesCount },
                { name: "Courses", value: summary.value.coursesCount },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
