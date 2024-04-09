import { API_URLS } from "../../../app/Consts/ApiUrls";
import {createExercise, changeExercise, deleteExerciseById} from "../../../app/Services/CreateExercise";
import Exercise from "../../../app/Models/Exercise";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

describe('Elastic Search Exercises', () => 
{
    const testExercise: Exercise = {
        exercise_name: "test",
        body_part: "Back",
        type: "BB",
        description: "test exercise"
    }

    beforeEach(() => {
        fetchMock.resetMocks();
    })

    it('returns error and status code if not ok response code', async () =>
    {
        //Arrange
        fetchMock.mockResponseOnce(JSON.stringify({}), {status: 500});

        //Act
        await expect(createExercise(testExercise)).rejects.toThrow("Error status: 500");

        // Assertion
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_POST_EXERCISES, {method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(testExercise)});
    })

    it('returns the exercise data with 200 status code', async () => {
        // Arrange
        const mockExercise: Exercise = {
            id: 4,
            exercise_name: 'Bicep',
            body_part: 'arm',
            description: 'bigger biceps',
            type: 'BB'
        };
    
        fetchMock.mockResponseOnce(JSON.stringify({ results: mockExercise }), { status: 201 });
    
        // Act
        const result = await createExercise(mockExercise);
    
        // Assert
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_POST_EXERCISES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mockExercise)
        });
        expect(result).toEqual(mockExercise);
    });

    it('returns the updated exercise data with 200 status code', async () => {
        // Arrange
        const mockExercise: Exercise = {
            id: 4,
            exercise_name: 'Updated Bicep',
            body_part: 'arm',
            description: 'bigger biceps',
            type: 'BB'
        };
        const mockId = '123';

        fetchMock.mockResponseOnce(JSON.stringify({ result: mockExercise }), { status: 200 });

        // Act
        const updatedExercise = await changeExercise(mockExercise, mockId);

        // Assert
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_POST_EXERCISES + `${mockId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mockExercise)
        });
        expect(updatedExercise).toEqual(mockExercise);
    });

    it('throws an error if response status is not OK', async () => {
        //Arrange
        const mockExercise: Exercise = {
            id: 4,
            exercise_name: 'Updated Bicep',
            body_part: 'arm',
            description: 'bigger biceps',
            type: 'BB'
        };

        const mockId = '123';

        fetchMock.mockResponseOnce('', { status: 500 });

        //Act
        await expect(changeExercise(mockExercise, mockId)).rejects.toThrow('Error status: 500');
    
        //Assert
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_POST_EXERCISES + `${mockId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mockExercise)
        });
    });

    it('deletes the exercise with 200 status code', async () => {
        // Arrange
        const mockId = '123';

        fetchMock.mockResponseOnce('', { status: 200 });

        // Act
        await deleteExerciseById(mockId);

        // Assert
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_POST_EXERCISES + `${mockId}/`, {
            method: 'DELETE'
        });
    });

    it('throws an error if response status is not OK', async () => {
        //Arrange
        const mockId = '123';
        fetchMock.mockResponseOnce('', { status: 500 });
        
        //Act
        await expect(deleteExerciseById(mockId)).rejects.toThrow('Error status: 500');
        
        //Assert
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_POST_EXERCISES + `${mockId}/`, {
            method: 'DELETE'
        });
    });
})