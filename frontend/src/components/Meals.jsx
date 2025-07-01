import MealItem from "./MealItem";
import useHttp from "../hook/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isloading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isloading) {
    return <p className="center">Fetching meals...</p>
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
