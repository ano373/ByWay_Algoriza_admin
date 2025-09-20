interface StatCardProps {
  number: number | string;
  label: string;
  icon?: React.ReactNode;
}

export default function StatCard({ number, label, icon }: StatCardProps) {
  return (
    <div className=" h-30 flex items-center justify-between bg-white rounded-xl shadow-lg   p-5">
      <div>
        <div className="text-3xl font-bold">{number}</div>
        <div className="font-bold">{label}</div>
      </div>

      <div className="p-3 bg-blue-50 rounded-lg text-blue-600">{icon}</div>
    </div>
  );
}
