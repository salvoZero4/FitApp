import { useLocation } from "react-router-dom";

type HeaderProps = {
  onMenuToggle: () => void;
};

export default function Header({ onMenuToggle }: HeaderProps) {
  const location = useLocation();

  const pageMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/workouts": "Workouts",
    "/nutrition": "Nutrition",
    "/progress": "Progress",
    "/register": "Register",
    "/login": "Login",
  };

  const pageTitle = pageMap[location.pathname] ?? "Fitness Tracker";
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b px-4 py-4 backdrop-blur md:px-8"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "rgba(8, 13, 24, 0.9)",
      }}
    >
      <div className="flex items-center gap-3">
        <button
          aria-label="Open menu"
          className="btn-secondary focus-ring h-10 px-3 md:hidden"
          onClick={onMenuToggle}
          type="button"
        >
          Menu
        </button>
        <div>
          <p className="text-sm text-[var(--text-secondary)]">{today}</p>
          <h1 className="text-lg font-semibold tracking-tight text-white md:text-xl">
            {pageTitle}
          </h1>
        </div>
      </div>
      <button
        className="btn-primary focus-ring shadow-[0_6px_20px_rgba(0,214,255,0.28)]"
        type="button"
      >
        Logout
      </button>
    </header>
  );
}
