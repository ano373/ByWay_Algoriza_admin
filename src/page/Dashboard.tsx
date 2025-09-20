import "../index.css";
import { FaRegUser } from "react-icons/fa";
import { IoMdListBox } from "react-icons/io";
import { BsCollection } from "react-icons/bs";

import StatCard from "../components/StatCard";
import Statistics from "../components/Statistics";

const data = [
  { name: "Instrcutors", value: 50 },
  { name: "Categories", value: 20 },
  { name: "Courses", value: 36 },
];

export default function Dashboard() {
  return (
    <div className="flex-1 p-8 bg-[#fcfcfc] w-full h-full">
      <div className="text-4xl"> Dashboard </div>
      <hr className="border-gray-400 my-6" />

      {/* Section 1 */}
      <div className="grid grid-cols-3 gap-8 ml-4 mt-6 mb-10">
        <StatCard
          number="50"
          label="Instructors"
          icon={<FaRegUser size={24} />}
        />
        <StatCard
          number="10"
          label="Categories"
          icon={<IoMdListBox size={24} />}
        />
        <StatCard
          number="36"
          label="Courses"
          icon={<BsCollection size={24} />}
        />
      </div>

      {/* Section 2*/}
      <div className="grid grid-cols-[4fr_3fr] gap-8 ml-4 mt-6">
        <div>
          <StatCard number="12" label="big card (2 cols)" />
        </div>
        <div>
          <Statistics data={data} />
        </div>
      </div>
    </div>
  );
}
