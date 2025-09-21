import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#4318FF", "#6AD2FF", "#c3d5ee"];

type StatisticsProps = {
  data: { name: string; value: number }[];
};

export default function Statistics({ data }: StatisticsProps) {
  return (
    <div className="flex flex-col gap-y-4 bg-white rounded-xl shadow-lg p-5">
      <span className="text-2xl font-bold">Statistics</span>
      <div className="flex justify-center">
        <PieChart width={330} height={330}>
          <Pie
            data={data}
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend height={36} />
        </PieChart>
      </div>
    </div>
  );
}
