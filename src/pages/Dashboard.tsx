import Calorietab from "../components/Calorietab";
import Weighttab from "../components/Weighttab";

export default function Dashboard() {
  const oggi = new Date();
  const formattedDate = oggi.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">{formattedDate}</h1>

      <div className="flex flex-row justify-between gap-4 w-full">
        <Calorietab />
        <Weighttab />
      </div>
    </>
  );
}
