import { API_URLS } from '../Consts/ApiUrls';
import Exercise from '../Models/Exercise';

const searchExercises = async (searchTerm: string) =>
{
    const response: Response = await fetch(API_URLS.SEARCH_EXERCISES + searchTerm);

         
    if (!response.ok)
    {
        throw new Error(`Error Occurred: ${response.status}`);
    }        

    const data: {results: Exercise[]} = await response.json();
    
    if(data.results.length === 0)
    {
        throw new Error("No Results!!");
    }

    return data.results;
}

export default searchExercises;