import { useState, useContext, type FormEvent } from "react";
import { MealContext } from "../../context/MealContext";

type GoalSettingsProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export default function GoalSettings({ setIsOpen }: GoalSettingsProps) {
  const { setCalorieGoal, setProteinGoal, setCarbsGoal, setFatsGoal } =
    useContext(MealContext)!;

  const [tempCalories, setTempCalories] = useState("");
  const [tempProtein, setTempProtein] = useState("");
  const [tempCarbs, setTempCarbs] = useState("");
  const [tempFats, setTempFats] = useState("");
  const [error, setError] = useState("");

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tempCalories.trim() === "" || isNaN(Number(tempCalories))) {
      setError("Please enter a valid calorie goal.");
      return;
    }
    setError("");
    if (
      tempCarbs.trim() === "" ||
      tempFats.trim() === "" ||
      tempProtein.trim() === "" ||
      isNaN(Number(tempCarbs)) ||
      isNaN(Number(tempFats)) ||
      isNaN(Number(tempProtein))
    ) {
      setError("Please enter valid macro goals.");
      return;
    }

    setCalorieGoal(Number(tempCalories));
    setProteinGoal(Number(tempProtein));
    setCarbsGoal(Number(tempCarbs));
    setFatsGoal(Number(tempFats));
    setError("");

    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="card-surface w-full max-w-md">
        <h2 className="mb-4 text-2xl font-semibold text-white">Edit Goals</h2>

        <form className="space-y-4" onSubmit={handleSave}>
          <div>
            <label className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
              Daily Calories
            </label>
            <input
              type="number"
              value={tempCalories}
              onChange={(e) => setTempCalories(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:border-[var(--accent)] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                Protein
              </label>
              <input
                type="number"
                value={tempProtein}
                onChange={(e) => setTempProtein(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                Carbs
              </label>
              <input
                type="number"
                value={tempCarbs}
                onChange={(e) => setTempCarbs(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                Fats
              </label>
              <input
                type="number"
                value={tempFats}
                onChange={(e) => setTempFats(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="btn-secondary w-full"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary w-full">
              Save Goals
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
