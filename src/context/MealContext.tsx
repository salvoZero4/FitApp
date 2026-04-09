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
  proteinGoal: number;
  setProteinGoal: (proteinGoal: number) => void;
  carbsGoal: number;
  setCarbsGoal: (carbsGoal: number) => void;
  fatsGoal: number;
  setFatsGoal: (fatsGoal: number) => void;
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
  const [proteinGoal, setProteinGoal] = useState<number>(150);
  const [carbsGoal, setCarbsGoal] = useState<number>(250);
  const [fatsGoal, setFatsGoal] = useState<number>(70);

  return (
    <MealContext.Provider
      value={{
        meals,
        setMeals,
        supplements,
        setSupplements,
        calorieGoal,
        setCalorieGoal,
        proteinGoal,
        setProteinGoal,
        carbsGoal,
        setCarbsGoal,
        fatsGoal,
        setFatsGoal,
      }}
    >
      {children}
    </MealContext.Provider>
  );
}
