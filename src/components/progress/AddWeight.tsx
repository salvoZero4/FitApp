import { useContext, useState } from "react";
import { ProgressContext } from "../../context/ProgressContext";

export default function AddWeight() {
  const { addWeightEntry } = useContext(ProgressContext);
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || !date) return;
    addWeightEntry({ weight: parseFloat(weight), date: new Date(date) });
    setWeight("");
    setDate("");
  };

  return (
    <div className="card-surface w-full row-span-2 flex flex-col">
      <h2 className="section-title">Add Weight</h2>
      <form className="mt-4 space-y-4" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="number"
          className="w-full p-4 border border-gray-300 rounded"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="date"
          className="w-full p-4 border border-gray-300 rounded"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit" className="btn-primary w-full py-3">
          Add Entry
        </button>
      </form>
    </div>
  );
}
