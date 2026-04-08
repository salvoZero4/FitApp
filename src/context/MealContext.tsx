import { createContext, useState } from "react";

export type Food = {
  name: string;
  weight: number;
  calories: number;
  macros: {
    carbs: number;
    protein: number;
    fats: number;
  };
};

export type Meal = {
  name: string;
  foods: Food[];
};

export type Supplement = {
  name: string;
  dosage: string;
  isChecked: boolean;
};
type MealContextType = {
  meals: Meal[];
  setMeals: (meals: Meal[]) => void;
  supplements: Supplement[];
  setSupplements: (supplements: Supplement[]) => void;
  calorieGoal: number;
  setCalorieGoal: (calorieGoal: number) => void;
};

export const MealContext = createContext<MealContextType>(null!);

export default function MealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [meals, setMeals] = useState<Meal[]>([
    {
      name: "Breakfast",
      foods: [],
    },
    { name: "Snacks", foods: [] },
    {
      name: "Lunch",
      foods: [],
    },
    { name: "Dinner", foods: [] },
  ]);
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [calorieGoal, setCalorieGoal] = useState<number>(2000);

  return (
    <MealContext.Provider
      value={{
        meals,
        setMeals,
        supplements,
        setSupplements,
        calorieGoal,
        setCalorieGoal,
      }}
    >
      {children}
    </MealContext.Provider>
  );
}
