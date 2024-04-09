import GetExerciseTypes from "../../../app/Services/GetExerciseTypes";
import ExerciseTypes from "../../../app/Models/ExerciseTypes";
import { API_URLS } from "../../../app/Consts/ApiUrls";
import 'jest-fetch-mock'
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

describe('GetExerciseTypes', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    })

    it('returns exercises with 200 status code', async () => 
    {
        // Arrange
        const mockExercise: ExerciseTypes[] = [{
            doc_count: 4,
            key: "Barbell"
        },
        {
            doc_count: 6,
            key: "BodyWeight"
        }]

        const mockData = { results: mockExercise};
        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        // Action
        const exercises = await GetExerciseTypes();
        
        // Assertion
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(exercises.length).toBe(2);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_EXERCISE_TYPES);
    })

    it('returns error and status if not OK response code', async () => 
    {
        // Arrange
        fetchMock.mockResponseOnce(JSON.stringify({}), {status: 500});

        //Action
        await expect(GetExerciseTypes()).rejects.toThrow('Http Error Status Code: 500');

        // Assertion
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenLastCalledWith(API_URLS.GET_EXERCISE_TYPES);
    })

    it('returns Error with message no results if no results from search', async () => 
    {
        // Arrange
        fetchMock.mockResponseOnce(JSON.stringify({results: []}), {status: 200});

        //Action
        await expect(GetExerciseTypes()).rejects.toThrow('No Results!!');

        // Assertion
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_EXERCISE_TYPES)
    })
})