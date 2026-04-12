import { useContext } from "react";
import { ProgressContext, type Weight } from "../../context/ProgressContext";

export default function Weighttab() {
  const { weightHistory } = useContext(ProgressContext);

  // Se non ci sono dati in assoluto
  if (weightHistory.length === 0) {
    return (
      <div className="card-surface w-full h-full flex flex-col justify-center">
        <p className="text-sm uppercase tracking-[0.16em] text-[var(--text-secondary)]">
          Current weight
        </p>
        <p className="mt-2 text-4xl font-bold text-white">-</p>
        <p
          className="mt-2 inline-block rounded-md border px-3 py-2 text-sm font-semibold text-[var(--text-secondary)]"
          style={{ borderColor: "var(--border)" }}
        >
          No data available
        </p>
      </div>
    );
  }

  //Peso attuale
  const currentEntry: Weight = weightHistory[weightHistory.length - 1];
  const currentWeight = currentEntry.weight;

  // --- CALCOLO DELLA SETTIMANA ---
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  // Filtriamo lo storico per prendere solo i pesi salvati negli ultimi 7 giorni
  const weeklyEntries = weightHistory.filter(
    (entry) => new Date(entry.date).getTime() >= sevenDaysAgo.getTime(),
  );

  let deviationWeight = 0;
  // Per fare una media servono almeno 2 dati nella settimana
  const hasWeeklyData = weeklyEntries.length > 1;

  if (hasWeeklyData) {
    // Sommiamo tutti i pesi della settimana e dividiamo per quanti sono
    const weeklyAverage =
      weeklyEntries.reduce((sum, curr) => sum + curr.weight, 0) /
      weeklyEntries.length;

    // Variazione = Peso Attuale - Media della Settimana
    deviationWeight = currentWeight - weeklyAverage;

    // Arrotondiamo a 2 decimali per non avere numeri lunghissimi
    deviationWeight = Math.round(deviationWeight * 100) / 100;
  }

  return (
    <div className="card-surface w-full h-full flex flex-col justify-center">
      <p className="text-sm uppercase tracking-[0.16em] text-[var(--text-secondary)]">
        Current weight
      </p>
      <p className="mt-2 text-4xl font-bold text-white">
        {currentWeight}{" "}
        <span className="text-base text-[var(--text-secondary)]">kg</span>
      </p>

      {hasWeeklyData ? (
        <>
          {deviationWeight < 0 && (
            <p className="mt-2 inline-block max-w-fit rounded-md border border-emerald-400/40 bg-emerald-400/12 px-3 py-2 text-sm font-semibold text-emerald-300">
              Down by {Math.abs(deviationWeight)} kg from weekly avg
            </p>
          )}

          {deviationWeight > 0 && (
            <p className="mt-2 inline-block max-w-fit rounded-md border border-rose-400/40 bg-rose-400/12 px-3 py-2 text-sm font-semibold text-rose-300">
              Up by {Math.abs(deviationWeight)} kg from weekly avg
            </p>
          )}

          {deviationWeight === 0 && (
            <p
              className="mt-2 inline-block max-w-fit rounded-md border px-3 py-2 text-sm font-semibold text-[var(--text-secondary)]"
              style={{ borderColor: "var(--border)" }}
            >
              Stable compared to weekly avg
            </p>
          )}
        </>
      ) : (
        <p
          className="mt-2 inline-block max-w-fit rounded-md border px-3 py-2 text-sm font-semibold text-[var(--text-secondary)]"
          style={{ borderColor: "var(--border)" }}
        >
          Need more data this week
        </p>
      )}
    </div>
  );
}
