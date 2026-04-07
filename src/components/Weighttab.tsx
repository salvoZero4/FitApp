export default function Weighttab() {
  const weight = 70; // Placeholder for actual weight data
  const deviationWeight = 0.5; // Placeholder for actual deviation data
  return (
    <div className="flex flex-col text-gray-400 rounded bg-[#313031] p-4 w-1/4">
      <p>Current weight</p>
      <p className="text-4xl text-white font-bold">
        {weight} <span className="text-lg text-gray-400">kg</span>
      </p>
      {deviationWeight < 0 && (
        <p className="text-green-500 font-bold pr-5">
          -{Math.abs(deviationWeight)} kg from average
        </p>
      )}
      {deviationWeight > 0 && (
        <p className={"text-red-500 font-bold pr-5"}>
          +{Math.abs(deviationWeight)} kg from average
        </p>
      )}
    </div>
  );
}
