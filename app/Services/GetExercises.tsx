import { API_URLS } from "../Consts/ApiUrls";
import Exercise from "../Models/Exercise";

export const GetExercises = async () =>
{
    const response: Response = await fetch(API_URLS.GET_POST_EXERCISES);

    if (!response.ok)
    {
        throw new Error(`Http Error Status Code: ${response.status}`);
    }

    const data: {results: Exercise[]} = await response.json();

    if(data.results.length === 0)
    {
        throw new Error("No Results!!");
    }
    
    return data.results;
}

export const GetExerciseById = async (id: string) =>
{
    const response: Response = await fetch(API_URLS.GET_POST_EXERCISES + `${id}`);

    if (!response.ok)
    {
        throw new Error(`Http Error Status Code: ${response.status}`);
    }

    const data: Exercise = await response.json();

    if(!data)
    {
        throw new Error("No Results!!");
    }
    
    return data;
}
