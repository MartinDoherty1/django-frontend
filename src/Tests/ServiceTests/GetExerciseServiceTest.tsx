import {GetExercises, GetExerciseById} from "../../../app/Services/GetExercises";
import { API_URLS } from "../../../app/Consts/ApiUrls";
import Exercise from "../../../app/Models/Exercise";
import 'jest-fetch-mock'
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

describe('GetExercises', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
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
        },
        {
            id: 4,
            exercise_name: "Bicep",
            body_part: "arm",
            description: "bigger biceps",
            type: "BB"
        }]

        const mockData = { results: mockExercise};
        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        // Action
        const exercises = await GetExercises();
        
        // Assertion
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(exercises.length).toBe(2);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_POST_EXERCISES);
    })

    it('returns error and status if not OK response code', async () => 
    {
        // Arrange
        fetchMock.mockResponseOnce(JSON.stringify({}), {status: 500});

        //Action
        await expect(GetExercises()).rejects.toThrow('Http Error Status Code: 500');

        // Assertion
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_POST_EXERCISES);
    })

    it('returns Error with message no results if no results from search', async () => 
    {
        // Arrange
        fetchMock.mockResponseOnce(JSON.stringify({results: []}), {status: 200});

        //Action
        await expect(GetExercises()).rejects.toThrow('No Results!!');

        // Assertion
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_POST_EXERCISES)
    })

    it('returns the exercise data with 200 status code', async () => {
        // Arrange
        const mockId = 'exercise-123';
        const mockExercise: Exercise = {
            id: 4,
            exercise_name: 'Bicep',
            body_part: 'arm',
            description: 'bigger biceps',
            type: 'BB'
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockExercise), { status: 200 });

        // Act
        const result = await GetExerciseById(mockId);

        // Assert
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_POST_EXERCISES + `${mockId}`);
        expect(result).toEqual(mockExercise);
    })

    it('throws an error if response status is not OK', async () => {
        //Arrange
        fetchMock.mockResponseOnce('', { status: 404 });
        
        //Act
        await expect(GetExerciseById('')).rejects.toThrow('Http Error Status Code: 404');
    
        //Assert
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_POST_EXERCISES + '');
    })

    it('throws an error if no results are returned', async () => {
        //Arrange
        fetchMock.mockResponseOnce(JSON.stringify(null), { status: 200 });
        
        //Act
        await expect(GetExerciseById("")).rejects.toThrow('No Results!!');
        
        //Assert
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_POST_EXERCISES + "");
    });
})