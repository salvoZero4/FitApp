import { createContext, useState, type ReactNode } from "react";

export type Weight = {
  date: Date;
  weight: number;
};

type ProgressContextType = {
  weightHistory: Weight[];
  addWeightEntry: (entry: Weight) => void;
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
  const [weightHistory, setWeightHistory] = useState<Weight[]>([]);

  const addWeightEntry = (entry: Weight) => {
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
