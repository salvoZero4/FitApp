import { useState, type FormEvent } from "react";
import { MealContext } from "../context/MealContext";
import type { Food, Meal } from "../context/MealContext";
import { useContext } from "react";

export default function Mealcard({
  activeMealName,
  setActiveMealName,
}: {
  activeMealName: string | null;
  setActiveMealName: (mealName: string | null) => void;
}) {
  const [error, setError] = useState("");
  const { meals, setMeals } = useContext(MealContext)!;
  const handleSetFood = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      foodName.trim() === "" ||
      foodWeight.trim() === "" ||
      foodCalories.trim() === "" ||
      foodCarbs.trim() === "" ||
      foodProtein.trim() === "" ||
      foodFats.trim() === ""
    ) {
      setError("Please fill all fields");
      return;
    }
    //logica per aggiungere il cibo al pasto attivo
    const newFood: Food = {
      name: foodName,
      weight: parseFloat(foodWeight),
      calories: parseFloat(foodCalories),
      macros: {
        carbs: parseFloat(foodCarbs),
        protein: parseFloat(foodProtein),
        fats: parseFloat(foodFats),
      },
    };
    console.log("Adding food to", activeMealName, newFood);
    const updatedMeals: Meal[] = meals.map((meal) => {
      if (meal.name === activeMealName) {
        return {
          ...meal,
          foods: [...meal.foods, newFood],
        };
      }
      return meal;
    });
    setMeals(updatedMeals);
    setFoodName("");
    setFoodWeight("");
    setFoodCalories("");
    setFoodCarbs("");
    setFoodProtein("");
    setFoodFats("");
    setActiveMealName(null); // Chiudi la card dopo aver aggiunto il cibo
  };
  const [foodName, setFoodName] = useState("");
  const [foodWeight, setFoodWeight] = useState("");
  const [foodCalories, setFoodCalories] = useState("");
  const [foodCarbs, setFoodCarbs] = useState("");
  const [foodProtein, setFoodProtein] = useState("");
  const [foodFats, setFoodFats] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="card-surface w-full max-w-md">
        <form className="space-y-4" onSubmit={handleSetFood}>
          <h2 className="text-2xl font-semibold text-white">
            Add Food to {activeMealName}
          </h2>
          <div>
            <input
              type="text"
              placeholder="Food Name"
              onChange={(e) => {
                setFoodName(e.target.value);
              }}
              value={foodName}
              className="w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              onChange={(e) => {
                setFoodWeight(e.target.value);
              }}
              value={foodWeight}
              placeholder="Weight (g)"
              className="w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              onChange={(e) => {
                setFoodCalories(e.target.value);
              }}
              value={foodCalories}
              placeholder="Calories (kcal)"
              className="w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-2 mt-2 items-center">
              <input
                type="number"
                onChange={(e) => {
                  setFoodProtein(e.target.value);
                }}
                value={foodProtein}
                placeholder="Protein (g)"
                className="w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                onChange={(e) => {
                  setFoodFats(e.target.value);
                }}
                value={foodFats}
                placeholder="Fats (g)"
                className="w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                onChange={(e) => {
                  setFoodCarbs(e.target.value);
                }}
                value={foodCarbs}
                placeholder="Carbs (g)"
                className="w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn-primary px-4 py-2 text-sm"
              onClick={() => setActiveMealName(null)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary px-4 py-2 text-sm">
              Add Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
