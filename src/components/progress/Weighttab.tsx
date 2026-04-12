export default function Weighttab() {
  const weight: number = 70; // Placeholder for actual weight data
  const deviationWeight: number = 0.5; // Placeholder for actual deviation data

  return (
    <div className="card-surface w-full">
      <p className="text-sm uppercase tracking-[0.16em] text-[var(--text-secondary)]">
        Current weight
      </p>
      <p className="mt-2 text-4xl font-bold text-white">
        {weight}{" "}
        <span className="text-base text-[var(--text-secondary)]">kg</span>
      </p>
      {deviationWeight < 0 && (
        <p className="mt-2 rounded-md border border-emerald-400/40 bg-emerald-400/12 px-3 py-2 text-sm font-semibold text-emerald-300">
          Down by {Math.abs(deviationWeight)} kg from average
        </p>
      )}
      {deviationWeight > 0 && (
        <p className="mt-2 rounded-md border border-rose-400/40 bg-rose-400/12 px-3 py-2 text-sm font-semibold text-rose-300">
          Up by {Math.abs(deviationWeight)} kg from average
        </p>
      )}
      {deviationWeight === 0 && (
        <p
          className="mt-2 rounded-md border px-3 py-2 text-sm font-semibold text-[var(--text-secondary)]"
          style={{ borderColor: "var(--border)" }}
        >
          Stable compared with average
        </p>
      )}
    </div>
  );
}
