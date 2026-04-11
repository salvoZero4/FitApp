import { useContext, useState } from "react";
import { MealContext } from "../context/MealContext";
import SupplementCard from "./SupplementCard";

export default function SupplementList() {
  const { supplements, setSupplements } = useContext(MealContext)!;
  const [activeSupplement, setActiveSupplement] = useState<boolean>(false);
  const toggleSupplement = (index: number) => {
    const updatedSupplements = supplements.map((supplement, i) => {
      if (i === index) {
        return { ...supplement, isChecked: !supplement.isChecked };
      }

      return supplement;
    });
    setSupplements(updatedSupplements);
  };
  return (
    <div className="card-surface w-full flex flex-col">
      <h2 className="text-2xl font-semibold text-white mb-2">Supplements</h2>
      {supplements.length > 0 ? (
        // ---- VISTA CON INTEGRATORI ----
        <div>
          <ul className="space-y-2">
            {supplements.map((supplement, index) => (
              <li key={index} className="text-white">
                {supplement.name} - {supplement.dosage}{" "}
                <button
                  className="ml-2 px-2 py-1 text-xs rounded bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors"
                  onClick={() => toggleSupplement(index)}
                >
                  {supplement.isChecked ? "Taken" : "Take"}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="btn-primary mt-4 w-full text-sm"
            onClick={() => setActiveSupplement(true)}
          >
            + Add Supplement
          </button>
        </div>
      ) : (
        // ---- VISTA SENZA INTEGRATORI ----
        <div className="flex-1 flex flex-col items-center  text-center">
          <p className="text-white mb-4 mt-4">No supplements added yet.</p>
          <button
            className="btn-primary mt-auto w-full text-sm"
            onClick={() => setActiveSupplement(true)}
          >
            + Add Supplement
          </button>
        </div>
      )}
      {activeSupplement && (
        <SupplementCard setActiveSupplement={setActiveSupplement} />
      )}
    </div>
  );
}
