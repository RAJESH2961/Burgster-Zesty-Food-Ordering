import MealItem from "./MealItem";
import useHttp from "../Hooks/useHttp";
import Error from "./Error";

const requestConfig = {  };
export default function Meals() {
    const {data: loadedMeals, isLoading, error} = useHttp('http://localhost:3000/meals', requestConfig, [])
    console.log(loadedMeals);
    
    
    if(isLoading){
        return <p>Fetching meals...</p>
    }

    // if(!loadedMeals){
    //     return <p>No meals found</p>
    // }
if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
}


    return <ul id="meals">
        {loadedMeals.map((meal) => (<MealItem key={meal.id} meal={meal} />))}
    </ul>
}