import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import { supabase } from "../api/supabaseClient";
import { AuthContext } from "./AuthContext";

export type Food = {
  name: string;
  weight: number;
  calories: number;
  macros: { carbs: number; protein: number; fats: number };
};

export type Meal = { name: string; foods: Food[] };
export type Supplement = { name: string; dosage: string; isChecked: boolean };

type MealContextType = {
  meals: Meal[];
  setMeals: (meals: Meal[]) => void;
  supplements: Supplement[];
  setSupplements: (supplements: Supplement[]) => void;
  calorieGoal: number;
  setCalorieGoal: (val: number) => void;
  proteinGoal: number;
  setProteinGoal: (val: number) => void;
  carbsGoal: number;
  setCarbsGoal: (val: number) => void;
  fatsGoal: number;
  setFatsGoal: (val: number) => void;
  resetDay: () => void; //reset tabella cibo
};

export const MealContext = createContext<MealContextType>(null!);

const defaultMeals: Meal[] = [
  { name: "Breakfast", foods: [] },
  { name: "Snacks", foods: [] },
  { name: "Lunch", foods: [] },
  { name: "Dinner", foods: [] },
];

export default function MealProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>(defaultMeals);
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [calorieGoal, setCalorieGoal] = useState<number>(2000);
  const [proteinGoal, setProteinGoal] = useState<number>(150);
  const [carbsGoal, setCarbsGoal] = useState<number>(250);
  const [fatsGoal, setFatsGoal] = useState<number>(70);

  const { user } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);

  const resetDay = () => {
    // Riportiamo i pasti allo stato vuoto originale
    setMeals([
      { name: "Breakfast", foods: [] },
      { name: "Snacks", foods: [] },
      { name: "Lunch", foods: [] },
      { name: "Dinner", foods: [] },
    ]);
  };

  // CARICAMENTO INIZIALE DA SUPABASE
  useEffect(() => {
    if (!user) return;

    const fetchNutrition = async () => {
      const { data, error } = await supabase
        .from("user_nutrition")
        .select("*")
        .eq("user_id", user.id)
        .single(); // Prendiamo l'unica riga dell'utente

      if (data) {
        if (data.meals) setMeals(data.meals);
        if (data.supplements) setSupplements(data.supplements);
        if (data.calorie_goal) setCalorieGoal(data.calorie_goal);
        if (data.protein_goal) setProteinGoal(data.protein_goal);
        if (data.carbs_goal) setCarbsGoal(data.carbs_goal);
        if (data.fats_goal) setFatsGoal(data.fats_goal);
      }
      setIsLoaded(true); // Diciamo all'app che abbiamo finito di scaricare
    };

    fetchNutrition();
  }, [user]);

  //AUTO-SALVATAGGIO SU SUPABASE OGNI VOLTA CHE I DATI CAMBIANO
  // Questo useEffect scatta ogni volta che uno dei tuoi dati cambia
  useEffect(() => {
    // Non salvare finché non abbiamo prima finito di caricare i dati dal server!
    if (!isLoaded || !user) return;

    const saveToDB = async () => {
      await supabase.from("user_nutrition").upsert(
        {
          user_id: user.id,
          meals: meals,
          supplements: supplements,
          calorie_goal: calorieGoal,
          protein_goal: proteinGoal,
          carbs_goal: carbsGoal,
          fats_goal: fatsGoal,
        },
        { onConflict: "user_id" },
      );
      // L'upsert sovrascrive i vecchi dati aggiornandoli istantaneamente
    };

    // DEBOUNCE: Aspettiamo mezzo secondo (500ms) prima di salvare.
    // Così se l'utente digita o clicca in fretta, non bombardiamo Supabase di chiamate!
    const timeoutId = setTimeout(() => {
      saveToDB();
    }, 500);

    // Se l'utente clicca un'altra cosa prima che passi mezzo secondo, annulla il salvataggio precedente
    return () => clearTimeout(timeoutId);
  }, [
    meals,
    supplements,
    calorieGoal,
    proteinGoal,
    carbsGoal,
    fatsGoal,
    isLoaded,
    user,
  ]);

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
        resetDay,
      }}
    >
      {children}
    </MealContext.Provider>
  );
}
