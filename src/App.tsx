import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
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
import AuthProvider, { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// Creiamo un piccolo componente per il Layout dell'app quando sei loggato
function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuToggle={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="flex-1 px-4 py-5 md:px-8 md:py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProgressProvider>
          <MealProvider>
            <WorkoutProvider>
              <div className="min-h-screen w-full text-white bg-[var(--app-bg)]">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route
                    path="*"
                    element={
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
            </WorkoutProvider>
          </MealProvider>
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
