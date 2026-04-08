import { useState } from "react";

export default function Workouts() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [selectedDays, setSelectedDays] = useState<string[]>([
    "Monday",
    "Wednesday",
    "Friday",
  ]);

  const toggleDay = (day: string) => {
    setSelectedDays((current) =>
      current.includes(day)
        ? current.filter((selectedDay) => selectedDay !== day)
        : [...current, day],
    );
  };

  return (
    <section className="space-y-5">
      <div className="card-surface">
        <h2 className="section-title">Select days</h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Tap days to customize your weekly split.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {days.map((day) => (
            <button
              aria-pressed={selectedDays.includes(day)}
              key={day}
              className={`focus-ring min-h-11 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                selectedDays.includes(day)
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-white"
              }`}
              onClick={() => toggleDay(day)}
              style={{
                borderColor: selectedDays.includes(day)
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
        {selectedDays.length > 0 ? (
          selectedDays.map((day) => (
            <div
              key={day}
              className="rounded-lg border p-5 text-white"
              style={{
                borderColor: "rgba(79, 143, 232, 0.4)",
                backgroundColor: "rgba(79, 143, 232, 0.16)",
              }}
            >
              <h2 className="text-lg font-semibold">{day}</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Active training day.
              </p>
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
    </section>
  );
}
