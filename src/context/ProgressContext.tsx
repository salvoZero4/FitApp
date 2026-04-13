import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from "react";
import { supabase } from "../api/supabaseClient";
import { AuthContext } from "../context/AuthContext";

export type Weight = {
  id?: number;
  date: string;
  weight: number;
};

type ProgressContextType = {
  weightHistory: Weight[];
  addWeightEntry: (entry: { date: Date; weight: number }) => Promise<void>;
};

export const ProgressContext = createContext<ProgressContextType>({
  weightHistory: [],
  addWeightEntry: async () => {},
});

export default function ProgressProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useContext(AuthContext)!;
  const [weightHistory, setWeightHistory] = useState<Weight[]>([]);

  const fetchWeightHistory = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("weight_history")
      .select("*")
      .order("date", { ascending: true });
    if (error) {
      console.error("Error fetching weight history:", error);
    } else {
      setWeightHistory(data);
    }
  };
  //ogni login aggiorniamo lo storico del peso
  useEffect(() => {
    fetchWeightHistory();
  }, [user]);

  const addWeightEntry = async (entry: { date: Date; weight: number }) => {
    const formattedDate = entry.date.toISOString().split("T")[0]; // Formatta la data come YYYY-MM-DD
    const { error } = await supabase.from("weight_history").insert({
      user_id: user?.id,
      date: formattedDate,
      weight: entry.weight,
    });
    if (error) {
      console.error("Error adding weight entry:", error);
    } else {
      fetchWeightHistory(); // Aggiorna lo storico del peso dopo l'inserimento
    }
  };

  return (
    <ProgressContext.Provider
      value={{ weightHistory, addWeightEntry: addWeightEntry }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
