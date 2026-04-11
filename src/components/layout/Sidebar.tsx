import { Link, NavLink } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "focus-ring w-full rounded-lg border border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-2 text-left text-sm font-semibold tracking-wide text-white shadow-[0_0_0_1px_rgba(0,214,255,0.25)]"
      : "focus-ring w-full rounded-lg border border-transparent px-3 py-2 text-left text-sm font-medium tracking-wide text-[var(--text-secondary)] transition-colors duration-200 hover:bg-[var(--surface-muted)] hover:text-white";
  };

  return (
    <>
      {isOpen && (
        <button
          aria-label="Close menu overlay"
          className="fixed inset-0 z-30 bg-[#02050e]/70 md:hidden"
          onClick={onClose}
          type="button"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r bg-[var(--app-bg)] p-4 transition-transform duration-300 md:static md:z-10 md:w-64 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mb-8 flex items-start justify-between">
          <Link to="/dashboard">
            <h1 className="text-2xl font-black tracking-tight text-[var(--accent)]">
              F.<span className="text-white">I</span>.T.
            </h1>
            <h2 className="text-xs tracking-[0.18em] text-[var(--text-secondary)]">
              FITNESS INFORMATION TRACKER
            </h2>
          </Link>
          <button
            aria-label="Close menu"
            className="btn-secondary focus-ring h-9 px-3 md:hidden"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        <nav aria-label="Main navigation">
          <ul className="space-y-3">
            <li>
              <NavLink
                className={getNavLinkClass}
                onClick={onClose}
                to="/dashboard"
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className={getNavLinkClass}
                onClick={onClose}
                to="/workouts"
              >
                Workouts
              </NavLink>
            </li>
            <li>
              <NavLink
                className={getNavLinkClass}
                onClick={onClose}
                to="/nutrition"
              >
                Nutrition
              </NavLink>
            </li>
            <li>
              <NavLink
                className={getNavLinkClass}
                onClick={onClose}
                to="/progress"
              >
                Progress
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
