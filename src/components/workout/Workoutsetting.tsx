import { useContext, useState } from "react";
import { WorkoutContext } from "../../context/WorkoutContext";

type WorkoutSettingProps = {
  selectedDay: string | null;
  setSelectedDay: (day: string | null) => void;
};

export default function WorkoutSetting({
  selectedDay,
  setSelectedDay,
}: WorkoutSettingProps) {
  const { workouts, setWorkouts } = useContext(WorkoutContext);

  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const [error, setError] = useState("");

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (exerciseName.trim() === "") {
      setError("Please enter an exercise name.");
      return;
    }
    setError("");

    const newExercise = {
      name: exerciseName,
      sets: sets,
      reps: reps,
      weight: weight,
    };
    const updatedWorkouts = workouts.map((workout) => {
      if (workout.day === selectedDay) {
        return { ...workout, exercises: [...workout.exercises, newExercise] };
      }
      return workout;
    });
    setWorkouts(updatedWorkouts);
    setSelectedDay(null);
    setExerciseName("");
    setSets(0);
    setReps(0);
    setWeight(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="card-surface w-full max-w-md">
        <h2 className="mb-4 text-2xl font-semibold text-white">Edit Goals</h2>

        <form className="space-y-4" onSubmit={handleSave}>
          <div>
            <label className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
              Add Exercise
            </label>
            <input
              type="text"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:border-[var(--accent)] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                sets
              </label>
              <input
                type="number"
                value={sets}
                onChange={(e) => setSets(Number(e.target.value))}
                className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                Reps
              </label>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
                className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                Weight
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="btn-secondary w-full"
              onClick={() => setSelectedDay(null)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary w-full">
              Save Exercise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
