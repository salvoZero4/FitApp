import Calorietab from "../components/Calorietab";
import { useState, useContext } from "react";
import Mealcard from "../components/Mealcard";
import { MealContext } from "../context/MealContext";
import SupplementCard from "../components/SupplementCard";

export default function Nutrition() {
  const { meals, supplements, setSupplements } = useContext(MealContext)!;
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;

  const [activeMealName, setActiveMealName] = useState<string | null>(null);
  const [activeSupplement, setActiveSupplement] = useState<boolean>(false);
  meals.forEach((meal) => {
    meal.foods.forEach((food) => {
      totalCalories += food.calories;
      totalProtein += food.macros.protein;
      totalCarbs += food.macros.carbs;
      totalFats += food.macros.fats;
    });
  });
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
    <section className="space-y-4">
      <h1 className="text-[var(--text-primary)] text-4xl font-bold tracking-tight md:text-5xl mb-5">
        Daily nutrition overview
      </h1>
      <Calorietab />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {meals.map((meal, index) => (
          <div key={index} className="card-surface w-full flex flex-col h-full">
            <h2 className="text-2xl font-semibold text-white mb-2">
              {meal.name}
            </h2>
            {meal.foods.length > 0 ? (
              <>
                <ul className="space-y-2 pb-4 ">
                  {meal.foods.map((food, foodIndex) => (
                    <li key={foodIndex} className="text-white">
                      {food.name} - {food.weight}g, {food.calories} kcal Carbs:{" "}
                      {food.macros.carbs}g, Protein: {food.macros.protein}g,
                      Fats: {food.macros.fats}g
                    </li>
                  ))}
                </ul>
                <button
                  className="btn-primary mt-4 w-full text-sm mt-auto"
                  onClick={() => setActiveMealName(meal.name)}
                >
                  {" "}
                  + Add Food to {meal.name}{" "}
                </button>
              </>
            ) : (
              <>
                <p className="text-white p-4">No foods added yet.</p>
                <button
                  className="btn-primary mt-4 w-full text-sm mt-auto"
                  onClick={() => setActiveMealName(meal.name)}
                >
                  {" "}
                  + Add Food to {meal.name}{" "}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="card-surface w-full">
        <h2 className="text-2xl font-semibold text-white mb-2">Supplements</h2>
        {supplements.length > 0 ? (
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
          <div>
            <p className="text-white">No supplements added yet.</p>
            <button
              className="btn-primary mt-4 w-full text-sm"
              onClick={() => setActiveSupplement(true)}
            >
              + Add Supplement
            </button>
          </div>
        )}
      </div>
      {activeMealName && (
        <Mealcard
          activeMealName={activeMealName}
          setActiveMealName={setActiveMealName}
        />
      )}
      {activeSupplement && (
        <SupplementCard setActiveSupplement={setActiveSupplement} />
      )}
    </section>
  );
}
