import { useContext, useState, type FormEvent } from "react";
import { MealContext, type Supplement } from "../../context/MealContext";
type supplementProps = {
  setActiveSupplement: (active: boolean) => void;
};

export default function SupplementCard({
  setActiveSupplement,
}: supplementProps) {
  const { supplements, setSupplements } = useContext(MealContext)!;
  const [nameSupplement, setNameSupplement] = useState("");
  const [dosage, setDosage] = useState("");
  const [error, setError] = useState("");
  const addSupplement = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameSupplement.trim() === "" || dosage.trim() === "") {
      setError("Please fill all fields");
      return;
    }
    const newSupplement: Supplement = {
      name: nameSupplement,
      dosage: dosage,
      isChecked: false,
    };
    console.log("Adding supplement", newSupplement);
    setSupplements([...supplements, newSupplement]);
    setNameSupplement("");
    setDosage("");
    setActiveSupplement(false); // Chiudi la card dopo aver aggiunto il supplemento
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="card-surface w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Add Supplement
        </h2>
        <form className="space-y-4" onSubmit={(e) => addSupplement(e)}>
          <input
            placeholder="Insert name"
            type="text"
            value={nameSupplement}
            onChange={(e) => setNameSupplement(e.target.value)}
            className="w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            placeholder="Insert dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            type="text"
            className="w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="flex flex-row gap-4">
            <button
              className="btn-secondary w-full"
              onClick={() => setActiveSupplement(false)}
            >
              Cancel
            </button>
            <button className="btn-primary w-full mr-auto" type="submit">
              Add Supplement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
