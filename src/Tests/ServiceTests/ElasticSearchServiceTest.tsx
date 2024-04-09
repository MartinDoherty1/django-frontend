import { API_URLS } from "../../../app/Consts/ApiUrls";
import searchExercises from "../../../app/Services/ElasticSearches";
import Exercise from "../../../app/Models/Exercise";
import 'jest-fetch-mock'
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

describe('Elastic Search Exercises', () => 
{
    const searchTerm = "test"
    beforeEach(() => {
        fetchMock.resetMocks();
    })

    it('returns error and status code if not ok response code', async () =>
    {
        fetchMock.mockResponseOnce(JSON.stringify({}), {status: 500});

        await expect(searchExercises(searchTerm)).rejects.toThrow("Error Occurred: 500");

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.SEARCH_EXERCISES + searchTerm);
    })

    it('returns error with no results returned', async () =>
    {
        fetchMock.mockResponseOnce(JSON.stringify({results: []}), {status:200});

        await expect(searchExercises(searchTerm)).rejects.toThrow("No Results!!");

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.SEARCH_EXERCISES + searchTerm)

    })

    it('returns exercises with 200 status code', async () => 
    {
        // Arrange
        const mockExercise: Exercise[] = [{   
            id: 4,
            exercise_name: "Bicep",
            body_part: "arm",
            description: "bigger biceps",
            type: "BB"
        }]

        fetchMock.mockResponseOnce(JSON.stringify({results: mockExercise}));

        // Action
        const exercises = await searchExercises(searchTerm);
        
        // Assertion
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(exercises.length).toBe(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.SEARCH_EXERCISES + searchTerm);
    })

})
