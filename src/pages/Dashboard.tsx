import Calorietab from "../components/Calorietab";
import Weighttab from "../components/Weighttab";
import Workouttab from "../components/Workouttab";

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

      <div className="flex flex-col gap-4 lg:flex-row">
        <Calorietab calories={2000} protein={150} carbs={250} fats={70} />
        <Weighttab />
      </div>

      <Workouttab />
    </section>
  );
}
