import { API_URLS } from "../Consts/ApiUrls";
import Workout from "../Models/Workout";

export const createWorkout = async (workout: Workout) => {

    const response: Response = await fetch(API_URLS.GET_POST_WORKOUT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            workout_name: workout.workout_name,
            exercise: workout.exercise
        })
    });

    if(!response.ok)
    {
        throw new Error(`Error status: ${response.status}`);
    }

    const data: {results: Workout} = await response.json();

    return data.results;
}

export const GetWorkouts = async () =>
{
    const response: Response = await fetch(API_URLS.GET_POST_WORKOUT);

    if (!response.ok)
    {
        throw new Error(`Http Error Status Code: ${response.status}`);
    }

    const data: {results: Workout[]} = await response.json();

    if(data.results.length === 0)
    {
        throw new Error("No Results!!");
    }
    
    return data.results;
}

export const GetWorkoutById = async (id: string) =>
{

    const response: Response = await fetch(API_URLS.GET_POST_WORKOUT + `${id}/`);

    if (!response.ok)
    {
        throw new Error(`Http Error Status Code: ${response.status}`);
    }

    const data: Workout = await response.json();

    if(data == null || data == undefined)
    {
        throw new Error("No Results!!");
    }
    
    return data;
}

export const deleteWorkoutById = async (id: string) =>
{
    const response: Response = await fetch(API_URLS.GET_POST_WORKOUT + `${id}/`, {
        method: 'DELETE'
    });

    if(!response.ok)
    {
        throw new Error(`Error status: ${response.status}`);
    }

    await new Promise(f => setTimeout(f, 3000));
}

export const changeWorkout = async (workout: Workout, id: string) =>
{
    const response: Response = await fetch(API_URLS.GET_POST_WORKOUT + `${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(workout)
    });

    if(!response.ok)
    {
        throw new Error(`Error status: ${response.status}`);
    }

    const data: {result: Workout} = await response.json();

    return data.result;
}