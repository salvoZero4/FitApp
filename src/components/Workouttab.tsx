export default function Workouttab() {
  const todayWorkout = {
    name: "Upper Body 1",
    exercises: [
      { name: "Bench Press", sets: 3, reps: 10 },
      { name: "Pull-ups", sets: 3, reps: 8 },
      { name: "Shoulder Press", sets: 3, reps: 12 },
      { name: "Bicep Curls", sets: 3, reps: 15 },
    ],
  };

  return (
    <div className="card-surface mt-1 w-full">
      <h2 className="section-title">Today workout</h2>
      <p className="mt-1 text-base text-[var(--text-secondary)]">
        {todayWorkout.name}
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {todayWorkout.exercises.map((exercise) => (
          <li
            key={exercise.name}
            className="rounded-lg border p-4 text-sm text-white"
            style={{
              borderColor: "rgba(0, 214, 255, 0.5)",
              backgroundColor: "rgba(0, 214, 255, 0.12)",
            }}
          >
            <p className="font-semibold">{exercise.name}</p>
            <p className="mt-1 text-[var(--text-secondary)]">
              {exercise.sets} sets x {exercise.reps} reps
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
