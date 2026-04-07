import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "text-[#2B77D2] font-bold border-r border-[#2B77D2] pr-5"
      : "text-gray-400 hover:text-[#2B77D2] transition-colors duration-500";
  };

  return (
    <aside className="bg-[#0A0A0B] text-gray-400 p-4 w-64 border-r border-gray-400 min-h-screen">
      <div>
        <Link to="/dashboard">
          <h1 className="text-2xl font-bold text-[#007AFF]">
            F.<span className="text-gray-400">I</span>.T.
          </h1>
          <h2 className="text-sm">
            <span className="text-[#007AFF]">FITNESS</span> INFORMATION{" "}
            <span className="text-[#007AFF]">TRACKER</span>
          </h2>
        </Link>
      </div>

      <nav>
        <ul className="space-y-10 text-center mt-8 pt-4">
          <li>
            <NavLink className={getNavLinkClass} to="/dashboard">
              DASHBOARD
            </NavLink>
          </li>
          <li>
            <NavLink className={getNavLinkClass} to="/workouts">
              WORKOUTS
            </NavLink>
          </li>
          <li>
            <NavLink className={getNavLinkClass} to="/nutrition">
              NUTRITION
            </NavLink>
          </li>
          <li>
            <NavLink className={getNavLinkClass} to="/progress">
              PROGRESS
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
