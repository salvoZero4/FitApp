import Calorietab from "../components/nutrition/Calorietab";
import { useState, useContext } from "react";
import Mealcard from "../components/nutrition/Mealcard";
import { MealContext } from "../context/MealContext";
import GoalSetting from "../components/nutrition/GoalSetting";
import SupplementList from "../components/nutrition/SupplementList";

export default function Nutrition() {
  const { meals, resetDay } = useContext(MealContext)!;
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;

  const [activeMealName, setActiveMealName] = useState<string | null>(null);
  const [isGoalSettingsOpen, setIsGoalSettingsOpen] = useState(false);
  meals.forEach((meal) => {
    meal.foods.forEach((food) => {
      totalCalories += food.calories;
      totalProtein += food.macros.protein;
      totalCarbs += food.macros.carbs;
      totalFats += food.macros.fats;
    });
  });

  return (
    <section className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-[var(--text-primary)] text-4xl font-bold tracking-tight md:text-5xl ">
          Daily nutrition overview
        </h1>

        <div>
          <button
            className="btn-secondary text-sm p-4 mr-2"
            onClick={() => resetDay()}
          >
            Reset Day
          </button>
          <button
            className="btn-primary  text-sm p-4"
            onClick={() => setIsGoalSettingsOpen(true)}
          >
            Edit Goals
          </button>
        </div>
      </div>

      <Calorietab />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 grid-rows-2">
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {meals.map((meal, index) => (
            <div
              key={index}
              className="card-surface w-full flex flex-col h-full"
            >
              <h2 className="text-2xl font-semibold text-white mb-2">
                {meal.name}
              </h2>
              {meal.foods.length > 0 ? (
                <>
                  <ul className="space-y-2 pb-4 ">
                    {meal.foods.map((food, foodIndex) => (
                      <li key={foodIndex} className="text-white">
                        {food.name} - {food.weight}g, {food.calories} kcal
                        Carbs: {food.macros.carbs}g, Protein:{" "}
                        {food.macros.protein}g, Fats: {food.macros.fats}g
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
        <div className="w-full h-full lg:col-span-1 row-span-2">
          <SupplementList />
        </div>
      </div>

      {activeMealName && (
        <Mealcard
          activeMealName={activeMealName}
          setActiveMealName={setActiveMealName}
        />
      )}
      {isGoalSettingsOpen && <GoalSetting setIsOpen={setIsGoalSettingsOpen} />}
    </section>
  );
}
