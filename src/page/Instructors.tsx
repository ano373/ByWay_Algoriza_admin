import { InstructorTable } from "../components/Instructor/table/InstructorTable";
import { ActionColumn } from "../components/Instructor/table/ActionColumn";
import { StarRating } from "../components/Instructor/StarRating";
import { useState } from "react";
import { TableToolBar } from "../components/Instructor/table/TableToolBar";

export default function InstructorsPage() {
  const [rating, setRating] = useState(2);

  const data = [
    {
      name: "John Doe",
      jobTitle: "Developer",
      Rate: <StarRating value={rating} editable onChange={setRating} />,
      Action: <ActionColumn />,
    },
    {
      name: "Jane Smith",
      jobTitle: "Manager",
      Rate: <StarRating value={2} />,
      Action: <ActionColumn />,
    },
    {
      name: "Alice Bro",
      jobTitle: "Designer",
      Rate: <StarRating value={3} />,
      Action: <ActionColumn />,
    },
    {
      name: "Alice Bro",
      jobTitle: "Designer",
      Rate: <StarRating value={4} />,
      Action: <ActionColumn />,
    },
    {
      name: "Alice Bro",
      jobTitle: "Designer",
      Rate: <StarRating value={5} />,
      Action: <ActionColumn />,
    },
  ];

  return (
    <div className="flex-1 p-8 bg-gray-50 w-full h-full">
      <div className="text-4xl"> Instructors </div>
      <hr className="border-gray-400 my-10 " />

      <div className="flex flex-col flex-1 w-full h-full bg-white rounded-4xl shadow-lg ">
        <TableToolBar />
        <InstructorTable rows={data} />
      </div>
    </div>
  );
}
