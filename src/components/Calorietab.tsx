import { useContext } from "react";
import { MealContext } from "../context/MealContext";
export default function Calorietab() {
  const { meals, calorieGoal, proteinGoal, carbsGoal, fatsGoal } =
    useContext(MealContext)!;
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;

  meals.forEach((meal) => {
    meal.foods.forEach((food) => {
      totalCalories += food.calories;
      totalProtein += food.macros.protein;
      totalCarbs += food.macros.carbs;
      totalFats += food.macros.fats;
    });
  });
  let caloriesLeft = calorieGoal ? calorieGoal - totalCalories : 0;
  let proteinLeft = proteinGoal ? proteinGoal - totalProtein : 0;
  let carbsLeft = carbsGoal ? carbsGoal - totalCarbs : 0;
  let fatsLeft = fatsGoal ? fatsGoal - totalFats : 0;
  return (
    <div className="card-surface w-full lg:flex-1">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-sm uppercase tracking-[0.16em] text-[var(--text-secondary)]">
            Calories
          </h2>
          <p className="text-[var(--text-secondary)]">
            <span className="text-4xl font-bold text-white md:text-5xl">
              {caloriesLeft}
            </span>{" "}
            kcal left
          </p>
        </div>
        <div className="grid w-full grid-cols-3 gap-3 md:ml-auto md:max-w-sm">
          <div
            className="rounded-lg border p-3"
            style={{
              borderColor: "rgba(0, 214, 255, 0.35)",
              backgroundColor: "rgba(0, 214, 255, 0.08)",
            }}
          >
            <p className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
              Protein
            </p>
            <p className="mt-1 text-xl font-semibold text-white">
              {proteinLeft} g
            </p>
          </div>
          <div
            className="rounded-lg border p-3"
            style={{
              borderColor: "rgba(0, 214, 255, 0.35)",
              backgroundColor: "rgba(0, 214, 255, 0.08)",
            }}
          >
            <p className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
              Carbs
            </p>
            <p className="mt-1 text-xl font-semibold text-white">
              {carbsLeft} g
            </p>
          </div>
          <div
            className="rounded-lg border p-3"
            style={{
              borderColor: "rgba(0, 214, 255, 0.35)",
              backgroundColor: "rgba(0, 214, 255, 0.08)",
            }}
          >
            <p className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
              Fats
            </p>
            <p className="mt-1 text-xl font-semibold text-white">
              {fatsLeft} g
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
