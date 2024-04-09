import { API_URLS } from "../Consts/ApiUrls";
import ExerciseTypes from "../Models/ExerciseTypes";

const GetExerciseTypes = async () =>
{
    const response: Response = await fetch(API_URLS.GET_EXERCISE_TYPES);

    if(!response.ok)
    {
        throw new Error(`Http Error Status Code: ${response.status}`);
    }

    const data: {results: ExerciseTypes[] } = await response.json();

    if(data.results.length === 0)
    {
        throw new Error("No Results!!");
    }

    return data.results;
}

export default GetExerciseTypes;