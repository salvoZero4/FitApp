import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Nutrition from "./pages/Nutrition";
import Progress from "./pages/Progress";
import Header from "./components/layout/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MealProvider from "./context/MealContext";
import WorkoutProvider from "./context/WorkoutContext";
import ProgressProvider from "./context/ProgressContext";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <ProgressProvider>
        <MealProvider>
          <WorkoutProvider>
            <div className="min-h-screen w-full text-white">
              <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
                <Sidebar
                  isOpen={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <Header
                    onMenuToggle={() => setIsSidebarOpen((prev) => !prev)}
                  />
                  <main className="flex-1 px-4 py-5 md:px-8 md:py-8">
                    <Routes>
                      <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                      />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/workouts" element={<Workouts />} />
                      <Route path="/nutrition" element={<Nutrition />} />
                      <Route path="/progress" element={<Progress />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/login" element={<Login />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </div>
          </WorkoutProvider>
        </MealProvider>
      </ProgressProvider>
    </BrowserRouter>
  );
}
