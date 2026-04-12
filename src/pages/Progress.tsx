import AddWeight from "../components/progress/AddWeight";
import HistoryWeight from "../components/progress/HistoryWeight";
import WeightChart from "../components/progress/WeightChart";
import Weighttab from "../components/progress/Weighttab";

export default function Progress() {
  return (
    <section className="space-y-6">
      <h1 className="page-title text-4xl font-bold tracking-tight md:text-5xl">
        Progress Tracker
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Weighttab />
          <AddWeight />
        </div>

        <div className="lg:col-span-2">
          <WeightChart />
        </div>
      </div>

      <div className="w-full">
        <HistoryWeight />
      </div>
    </section>
  );
}
