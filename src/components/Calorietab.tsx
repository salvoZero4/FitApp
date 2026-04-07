export default function Calorietab() {
  const calories = 2000; // Example calorie value
  const protein = 150; // Example protein value
  const carbs = 250; // Example carbs value
  const fats = 70; // Example fats value
  return (
    <div className="bg-[#313031] p-5 rounded flex items-center flex-row w-3/4">
      <div>
        <h2 className="text-gray-400 text-xl">Calorie</h2>
        <p className="text-lg ">
          <span className="font-bold text-white text-5xl">{calories}</span> kcal
          left
        </p>
      </div>
      <div className="ml-auto flex items-center flex-col p-4">
        <div className="rounded flex items-center flex-row gap-4 text-gray-400">
          <p>Protein</p>
          <p>Carbs</p>
          <p>Fats</p>
        </div>
        <div className="rounded flex items-center flex-row gap-4">
          <p className="text-lg ">
            <span className="font-bold text-white text-2xl">{protein}</span> g
          </p>
          <p className="text-lg ">
            <span className="font-bold text-white text-2xl">{carbs}</span> g
          </p>
          <p className="text-lg ">
            <span className="font-bold text-white text-2xl">{fats}</span> g
          </p>
        </div>
      </div>
    </div>
  );
}
