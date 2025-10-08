import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "1", deposits: 400, withdrawals: 240 },
  { day: "5", deposits: 300, withdrawals: 180 },
  { day: "10", deposits: 350, withdrawals: 250 },
  { day: "15", deposits: 500, withdrawals: 200 },
  { day: "20", deposits: 420, withdrawals: 300 },
  { day: "25", deposits: 460, withdrawals: 280 },
  { day: "30", deposits: 480, withdrawals: 320 },
];

export function WalletChart() {
  return (
    <div className="bg-white p-6  rounded-xl shadow-lg flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-800">Wallet</h2>
        <p className="text-3xl font-bold text-gray-900 mt-2">$37.5K</p>
        <p className="text-sm text-gray-500">
          Wallet Balance{" "}
          <span className="text-green-500 font-medium">+2.45%</span>
        </p>

        <div className="mt-4 text-green-600 font-medium">On your account</div>

        <div className="mt-6 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
            <span className="text-sm text-gray-600">Deposits</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
            <span className="text-sm text-gray-600">Withdrawals</span>
          </div>
        </div>
      </div>

      <div className="flex-2">
        <div className="text-sm text-gray-600 mb-2 text-right">This month</div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 12 }} />
            <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="deposits"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="withdrawals"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
