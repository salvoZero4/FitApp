import { useContext } from "react";
import { ProgressContext } from "../../context/ProgressContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function HistoryWeight() {
  const { weightHistory } = useContext(ProgressContext);

  const chartData = weightHistory.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "2-digit",
    }),
    weight: entry.weight,
  }));

  return (
    <div className="card-surface flex w-full flex-col h-full">
      <h2 className="section-title mb-4">Weight Trend</h2>

      <div className="flex-1 w-full h-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, bottom: 5, left: -20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              stroke="var(--text-secondary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10} // Sposta le scritte un po' più in basso
            />

            <YAxis
              domain={["dataMin - 2", "dataMax + 2"]}
              stroke="var(--text-secondary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}kg`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface-muted)",
                borderColor: "var(--border)",
                borderRadius: "0.5rem",
                color: "white",
              }}
              itemStyle={{ color: "var(--accent)", fontWeight: "bold" }}
            />

            <Line
              type="monotone" // Rende le curve morbide
              dataKey="weight"
              stroke="var(--accent)" // Colore azzurro neon
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "var(--surface)",
                stroke: "var(--accent)",
                strokeWidth: 2,
              }}
              activeDot={{ r: 6, fill: "var(--accent)", stroke: "white" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
