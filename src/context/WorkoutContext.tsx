import { createContext, type ReactNode, useState } from "react";

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
  exercise: Exercise | null;
  setExercise: (exercise: Exercise | null) => void;
};

export const WorkoutContext = createContext<WorkoutContextType>(null!);

export default function WorkoutProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      day: "Monday",
      session: "",
      exercises: [],
      isActive: false,
    },
    {
      day: "Tuesday",
      session: "",
      exercises: [],
      isActive: false,
    },
    {
      day: "Wednesday",
      session: "",
      exercises: [],
      isActive: false,
    },
    {
      day: "Thursday",
      session: "",
      exercises: [],
      isActive: false,
    },
    {
      day: "Friday",
      session: "",
      exercises: [],
      isActive: false,
    },
    {
      day: "Saturday",
      session: "",
      exercises: [],
      isActive: false,
    },
    {
      day: "Sunday",
      session: "",
      exercises: [],
      isActive: false,
    },
  ]);
  const [exercise, setExercise] = useState<Exercise | null>(null);

  return (
    <WorkoutContext.Provider
      value={{ workouts, setWorkouts, exercise, setExercise }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}
