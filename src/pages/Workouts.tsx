import { useState, useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
import WorkoutSetting from "../components/workout/Workoutsetting";
import SessionEdit from "../components/workout/SessionEdit";

export default function Workouts() {
  const { workouts, saveWorkoutsToDB } = useContext(WorkoutContext);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [editSessionName, setEditSessionName] = useState("");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const ActiveDays = workouts
    .filter((workout) => workout.isActive)
    .map((workout) => workout.day);
  // Impostiamo lo stato per vedere quale giorno del workout è attivo, in modo da poterlo evidenziare nell'interfaccia utente.
  const toggleDay = (day: string) => {
    const updatedWorkouts = workouts.map((workout) => {
      if (workout.day === day) {
        return { ...workout, isActive: !workout.isActive };
      }
      return workout;
    });
    saveWorkoutsToDB(updatedWorkouts);
  };

  return (
    <section className="space-y-5">
      <h1 className="page-title">Workouts</h1>

      <div className="card-surface">
        <h2 className="section-title">Select days</h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Tap days to customize your weekly split.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {days.map((day) => (
            <button
              aria-pressed={ActiveDays.includes(day)}
              key={day}
              className={`focus-ring min-h-11 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                ActiveDays.includes(day)
                  ? "bg-[var(--accent)] text-[#041426]"
                  : "bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:bg-[#243454] hover:text-white"
              }`}
              onClick={() => toggleDay(day)}
              style={{
                borderColor: ActiveDays.includes(day)
                  ? "var(--accent)"
                  : "var(--border)",
              }}
              type="button"
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ActiveDays.length > 0 ? (
          ActiveDays.map((day) => (
            <div
              key={day}
              className="rounded-lg border p-5 text-white"
              style={{
                borderColor: "rgba(0, 214, 255, 0.45)",
                backgroundColor: "rgba(0, 214, 255, 0.12)",
              }}
            >
              <div className="flex flex-row items-center justify-between mb-4 mt-0">
                <h2 className="text-lg font-semibold">{day}</h2>
                <button
                  className="btn-secondary text-xs"
                  onClick={() => setEditSessionName(day)}
                >
                  Edit Session Name
                </button>
              </div>

              <div>
                {workouts.map((workout) => {
                  if (workout.day === day && workout.session) {
                    return (
                      <div
                        key={workout.day}
                        className="mb-4 inline-block rounded-md border border-gray-700 bg-[var(--surface)] px-4 py-2 shadow-sm"
                      >
                        <p className="text-lg font-bold tracking-wide text-[var(--accent)] uppercase">
                          {workout.session}
                        </p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <ul className="mt-3 space-y-2">
                {workouts.map((workout) => {
                  if (workout.day === day) {
                    return workout.exercises.map((exercise, index) => (
                      <li
                        key={index}
                        className="rounded-md border border-[var(--border)] bg-[var(--surface)]/65 px-3 py-2 text-sm"
                      >
                        <p className="font-medium text-xl">{exercise.name}</p>
                        <p>
                          {exercise.sets} sets {exercise.reps} reps{" "}
                          {exercise.weight} kg
                        </p>
                      </li>
                    ));
                  }

                  return null;
                })}
              </ul>

              <button
                className="btn-primary mt-4 w-full text-sm"
                onClick={() => setSelectedDay(day)}
              >
                + Add Exercise
              </button>
            </div>
          ))
        ) : (
          <p
            className="rounded-lg border p-4 text-sm text-[var(--text-secondary)]"
            style={{ borderColor: "var(--border)" }}
          >
            No days selected yet. Choose at least one day above.
          </p>
        )}
      </div>
      {selectedDay && (
        <WorkoutSetting
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      )}
      {editSessionName && (
        <SessionEdit
          sessionName={editSessionName}
          setSessionName={setEditSessionName}
        />
      )}
    </section>
  );
}
