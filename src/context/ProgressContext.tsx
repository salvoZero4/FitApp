import { createContext, useState, type ReactNode } from "react";

type weight = {
  date: Date;
  weight: number;
};

type ProgressContextType = {
  weightHistory: weight[];
  addWeightEntry: (entry: weight) => void;
};

export const ProgressContext = createContext<ProgressContextType>({
  weightHistory: [],
  addWeightEntry: () => {},
});

export default function ProgressProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [weightHistory, setWeightHistory] = useState<weight[]>([
    {
      date: new Date("2024-01-01"),
      weight: 80,
    },
    {
      date: new Date("2024-02-01"),
      weight: 78,
    },
  ]);

  const addWeightEntry = (entry: weight) => {
    setWeightHistory((prev) => [...prev, entry]);
  };

  return (
    <ProgressContext.Provider
      value={{ weightHistory, addWeightEntry: addWeightEntry }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
