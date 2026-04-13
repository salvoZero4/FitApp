import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../api/supabaseClient";
import { AuthContext } from "../context/AuthContext";

export type Exercise = {
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

export type Workout = {
  day: string;
  session: string;
  exercises: Exercise[] | [];
  isActive: boolean;
};

type WorkoutContextType = {
  workouts: Workout[];
  setWorkouts: (workouts: Workout[]) => void;
  saveWorkoutsToDB: (updatedWorkouts: Workout[]) => Promise<void>;
  exercise: Exercise | null;
  setExercise: (exercise: Exercise | null) => void;
};

export const WorkoutContext = createContext<WorkoutContextType>(null!);

export default function WorkoutProvider({ children }: { children: ReactNode }) {
  const { user } = useContext(AuthContext);
  // Valori Predefiniti per ogni giorno della settimana
  const defaultWeek: Workout[] = [
    { day: "Monday", session: "", exercises: [], isActive: false },
    { day: "Tuesday", session: "", exercises: [], isActive: false },
    { day: "Wednesday", session: "", exercises: [], isActive: false },
    { day: "Thursday", session: "", exercises: [], isActive: false },
    { day: "Friday", session: "", exercises: [], isActive: false },
    { day: "Saturday", session: "", exercises: [], isActive: false },
    { day: "Sunday", session: "", exercises: [], isActive: false },
  ];
  const [workouts, setWorkouts] = useState<Workout[]>(defaultWeek);
  const [exercise, setExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchWorkouts = async () => {
      const { data, error } = await supabase
        .from("user_workouts")
        .select("day, session, is_active, exercises");

      if (error) {
        console.error("Errore caricamento allenamenti:", error);
      } else if (data && data.length > 0) {
        const dbWorkouts = defaultWeek.map((defaultDay) => {
          const found = data.find((d) => d.day === defaultDay.day);
          if (found) {
            return {
              day: found.day,
              session: found.session || "",
              isActive: found.is_active,
              exercises: found.exercises || [],
            };
          }
          return defaultDay;
        });
        setWorkouts(dbWorkouts);
      }
    };

    fetchWorkouts();
  }, [user]);

  const saveWorkoutsToDB = async (updatedWorkouts: Workout[]) => {
    if (!user) return;

    setWorkouts(updatedWorkouts); // Aggiorniamo subito lo schermo per far sembrare l'app scattante

    // Prepariamo i dati formattandoli per Supabase
    const dataToSave = updatedWorkouts.map((w) => ({
      user_id: user.id,
      day: w.day,
      session: w.session,
      is_active: w.isActive,
      exercises: w.exercises,
    }));

    const { error } = await supabase
      .from("user_workouts")
      .upsert(dataToSave, { onConflict: "user_id, day" }); //Upsert per inserire o aggiornare in base a user_id e day

    if (error) {
      console.error("Errore durante il salvataggio degli allenamenti:", error);
    }
  };

  return (
    <WorkoutContext.Provider
      value={{ workouts, setWorkouts, saveWorkoutsToDB, exercise, setExercise }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}
