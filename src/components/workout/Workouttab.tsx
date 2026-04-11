import { useContext } from "react";
import { WorkoutContext } from "../../context/WorkoutContext";

export default function Workouttab() {
  const { workouts } = useContext(WorkoutContext);

  // Capiamo che giorno è oggi in inglese
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  // Troviamo l'oggetto del giorno corrente
  const todayWorkout = workouts.find((workout) => workout.day === today);

  // Verifichiamo se è un Rest Day (se il giorno non è attivo o non ci sono esercizi)
  const isRestDay =
    !todayWorkout?.isActive || todayWorkout?.exercises.length === 0;

  return (
    <div className="card-surface w-full lg:flex-1 h-full flex flex-col">
      <h2 className="section-title">Today workout</h2>

      {isRestDay ? (
        // ---- VISTA REST DAY ----
        <div className="flex-1 flex flex-col items-center justify-center mt-4 rounded-lg border border-[var(--border)] p-6 text-center">
          <p className="text-xl font-bold tracking-wide text-[var(--text-secondary)] uppercase">
            Rest Day
          </p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Take time to recover. No workouts scheduled for today!
          </p>
        </div>
      ) : (
        // ---- VISTA ALLENAMENTO ATTIVO ----
        <>
          <p className="mt-1 text-base text-[var(--text-secondary)]">
            {todayWorkout?.session?.toUpperCase()}
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {todayWorkout?.exercises.map((exercise, index) => (
              <li
                key={index}
                className="rounded-lg border p-4 text-sm text-white"
                style={{
                  borderColor: "rgba(0, 214, 255, 0.5)",
                  backgroundColor: "rgba(0, 214, 255, 0.12)",
                }}
              >
                <p className="font-semibold text-lg">{exercise.name}</p>
                <p className="mt-1 text-[var(--text-secondary)]">
                  {exercise.sets} sets {exercise.reps} reps
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
