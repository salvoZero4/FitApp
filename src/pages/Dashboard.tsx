import Calorietab from "../components/nutrition/Calorietab";
import SupplementList from "../components/nutrition/SupplementList";

import Weighttab from "../components/progress/Weighttab";
import Workouttab from "../components/workout/Workouttab";

export default function Dashboard() {
  const oggi = new Date();
  const formattedDate = oggi.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <section className="space-y-4 md:space-y-6">
      <h1 className="page-title">{formattedDate}</h1>

      <div className="flex flex-col gap-4 lg:flex-row items-stretch">
        <Calorietab />
        <div className="flex w-full lg:max-w-xs">
          <Weighttab />
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row items-stretch">
        <Workouttab />
        <div className="flex w-full lg:max-w-xs">
          <SupplementList />
        </div>
      </div>
    </section>
  );
}
