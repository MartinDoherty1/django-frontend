import { API_URLS } from "../../../app/Consts/ApiUrls";
import Workout from "../../../app/Models/Workout";
import { createWorkout, GetWorkouts } from "../../../app/Services/CreateWorkout";
import 'jest-fetch-mock'
import { enableFetchMocks } from "jest-fetch-mock";


enableFetchMocks();

describe("Workout Services", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    })

    it("create workout returns ", async () => {
        // Arrange
        const mockWorkout: Workout = {exercise: [1,2], workout_name:"test-post", id: 3};

        fetchMock.mockResponseOnce(JSON.stringify({results: mockWorkout}), {status:200});

        // Action
        const response = await createWorkout({exercise: [1,2], workout_name:"test-post"});

        // Assert
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(response.id).toEqual(mockWorkout.id);
    })

    it("returns workout with 200 status code", async () => {
        // Arrange
        const mockWorkout: Workout[] = [{workout_name: "test", exercise: [1,2]}, {workout_name:"test-2", exercise:[1,2]}];

        fetchMock.mockResponseOnce(JSON.stringify({results: mockWorkout}), {status: 200});

        // Action
        const response = await GetWorkouts();

        // Assert
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_POST_WORKOUT);
        expect(response).toEqual(mockWorkout);
    })

    it("returns error with non ok status code", async () => {
        // Arrange

        fetchMock.mockResponseOnce(JSON.stringify(null), {status: 500});

        // Action
        const response = await expect(GetWorkouts()).rejects.toThrow("Http Error Status Code: 500");

        // Assert
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_POST_WORKOUT);
        
    })

    it("returns error with no results", async () => {
        // Arrange

        fetchMock.mockResponseOnce(JSON.stringify({results: []}), {status: 200});

        // Action
        const response = await expect(GetWorkouts()).rejects.toThrow("No Results!!");

        // Assert
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(API_URLS.GET_POST_WORKOUT);
        
    })
})