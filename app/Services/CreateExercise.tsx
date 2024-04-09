import { API_URLS } from "../Consts/ApiUrls";
import Exercise from "../Models/Exercise";

export const createExercise = async (exercise: Exercise) =>
{
    const response: Response = await fetch(API_URLS.GET_POST_EXERCISES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exercise)
    });


    if(!response.ok)
    {
        throw new Error(`Error status: ${response.status}`);
    }

    const data: {results: Exercise} = await response.json();

    await new Promise(f => setTimeout(f, 3000));
    return data.results;
}

export const changeExercise = async (exercise: Exercise, id: string) =>
{
    const response: Response = await fetch(API_URLS.GET_POST_EXERCISES + `${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exercise)
    });

    if(!response.ok)
    {
        throw new Error(`Error status: ${response.status}`);
    }

    const data: {result: Exercise} = await response.json();

    await new Promise(f => setTimeout(f, 3000));
    return data.result;
}

export const deleteExerciseById = async (id: string) =>
{
    const response: Response = await fetch(API_URLS.GET_POST_EXERCISES + `${id}/`, {
        method: 'DELETE'
    });

    if(!response.ok)
    {
        throw new Error(`Error status: ${response.status}`);
    }

    await new Promise(f => setTimeout(f, 3000));
}
