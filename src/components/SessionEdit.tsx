import { useState, useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export default function SessionEdit({
  sessionName,
  setSessionName,
}: {
  sessionName: string;
  setSessionName: (name: string) => void;
}) {
  const { workouts, setWorkouts } = useContext(WorkoutContext);
  const [tempName, setTempName] = useState(
    workouts.find((w) => w.day === sessionName)?.session || "",
  );

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedWorkouts = workouts.map((workout) => {
      if (workout.day === sessionName) {
        return { ...workout, session: tempName };
      }
      return workout;
    });
    setWorkouts(updatedWorkouts);
    setSessionName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="card-surface w-full max-w-md">
        <h2 className="mb-4 text-2xl font-semibold text-white">
          Edit Session Name
        </h2>

        <form className="space-y-4" onSubmit={handleSave}>
          <div>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:border-[var(--accent)] focus:outline-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="btn-secondary w-full"
              onClick={() => setSessionName("")}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary w-full">
              Save Session Name
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
