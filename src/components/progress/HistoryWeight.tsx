import { useContext } from "react";
import { ProgressContext } from "../../context/ProgressContext";

export default function HistoryWeight() {
  const { weightHistory } = useContext(ProgressContext);
  const reverseHistory = [...weightHistory].reverse();

  return (
    <div className="card-surface">
      <h2 className="section-title">Weight History</h2>
      <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)] flex flex-row gap-2">
        {reverseHistory.map((entry, index) => (
          <li key={index} className="flex items-center gap-4 mr-auto">
            <span>{new Date(entry.date).toLocaleDateString()}</span>
            <span className="mr-auto">{entry.weight} kg</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
