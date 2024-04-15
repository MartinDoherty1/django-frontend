"use client";
import { useQuery, useMutation } from "react-query";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import _ from 'lodash';
import { queryClient } from '../../Components/QueryClientProvider';
import Loading from "../../Components/Loading";
import Navbar from "../../Components/NavigationBar";
import ErrorWithExerciseMutation from "../../Components/ErrorWithExerciseMutation";
import Workout from "../../Models/Workout";
import { deleteWorkoutById, GetWorkoutById, changeWorkout } from "../../Services/CreateWorkout";
import { GetExercises } from "../../Services/GetExercises";
import React, {  useState } from "react";
import Exercise from "../../Models/Exercise";
import { useUser } from "@auth0/nextjs-auth0/client";


const UpdateWorkout = () => {
    const [workout, setWorkout] = useState<Workout>({workout_name: "", exercise: []});
    const [exercises, setExercises] = useState<Exercise[]>();
    const {user} = useUser();

    const SearchParams = useSearchParams();

    const  workoutId  = SearchParams.get('workoutId');

    useQuery<Exercise[], Error>(
        ['exercises'],
        GetExercises,
        {
          retry: (_failureCount, error) => error.message !=="No Results!!",
          refetchOnWindowFocus: false,
          onSuccess: (data) =>
          {
            setExercises(data)
          }
        }
    ); 

    const {data: fetchedWorkout} = useQuery<Workout, Error>(
        ['workout'],
        () => GetWorkoutById(workoutId!),
        {
          retry: (_failureCount, error) => error.message !=="No Results!!",
          refetchOnWindowFocus: false,
          enabled: workoutId !== undefined,
          onSuccess: (data) =>
          {
            setWorkout(data);
          }
        }
    );

    const deleteWorkoutMutation = useMutation(() => deleteWorkoutById(workoutId!),
    {
        onError: (err:Error) => {
            console.error(`Error Deleting Workout: ${err.message}`);
        },
        onSettled: () => {
            queryClient.invalidateQueries('update');
        }
    })

    const updateWorkoutMutation = useMutation(() => changeWorkout(workout!, workoutId!),
    {
        onError: (err:Error) => {
            console.error(`Error Creating Workout: ${err.message}`);
        },
        onSettled: () => {
            queryClient.invalidateQueries('update');
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => 
    {
        event.preventDefault();

        if((workout == fetchedWorkout) || (workout.exercise.length === 0)) return;

        updateWorkoutMutation.mutate();
    }

    const handleDelete = () =>
    {
        deleteWorkoutMutation.mutate();
    }

    if(workoutId == undefined || workoutId == null || workoutId == "" || fetchedWorkout == undefined)
    {
        return (<ErrorWithExerciseMutation link="/ViewWorkout" linkText="Back To Select Workout" h1Text={fetchedWorkout == undefined ? "Workout Does Not Exist" : "Workout Not Selected"}/>)
    }

    if(updateWorkoutMutation.isLoading || deleteWorkoutMutation.isLoading)
    {
        <Loading/>
    }

    if(updateWorkoutMutation.isSuccess)
    {
        return(
            <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Updated Successfully</h1>
                <p className="text-gray-600 mb-6">Workout Name: {workout.workout_name}</p>
                <Link href="/ViewWorkout" className="inline-block py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold">Go back to View Workouts</Link>
            </div>
        </div>
        )
    }

    if(deleteWorkoutMutation.isSuccess) {
        return (
            <div className="bg-gray-100 h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">Deleted Successfully</h1>
                    <a href="/" className="inline-block py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold">Go back to Home Screen</a>
                </div>
            </div>
        )
    }

    function workoutNameChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        setWorkout({ ...workout,
            [event.target.name]: event.target.value
        })
    }

    function updateWorkout(selectedExercise: Exercise) {

        const id: number = selectedExercise.id!;

        if(!(workout.exercise.includes(id)))
        {
            setWorkout({
                ...workout,
                exercise: [...workout.exercise, id],
            })
            return
        }

        if(workout.exercise.includes(id))
        {
            const updatedWorkoutList = workout.exercise.filter((exerciseId) => exerciseId !== id);

            setWorkout({
                ...workout,
                exercise: updatedWorkoutList,
            })
            return
        }
    }

    return(
        <>
            <Navbar isLoggedIn={user ? true : false }/>
            {(workout.exercise.length === 0) && (
                <div className="bg-red-500 text-white text-center p-2">You Must Select An Exercise</div>
            )}
            {(_.isEqual(workout,fetchedWorkout)) && (
                <div className="bg-red-500 text-white text-center p-2">No Changes</div>
            )}

            <form id='workout-form' onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center">
                        <label htmlFor="workout_name" className="text-md font-medium text-gray-900 block mb-2 pt-2">Workout Name:</label>
                        <input type='text' placeholder='Workout Name' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-1/4 p-2.5"
                        required  id="workout_name" name="workout_name" maxLength={50} value={workout?.workout_name ?? ''} onChange={workoutNameChange}/>
                    </div>
            </form>
            <br/>

            <div className="flex flex-row justify-center">
                {exercises && exercises.map((item,index) => (
                <React.Fragment key={index}>
                    <div className={`border-4 rounded hover:bg-gray-400 border-sky-500 m-10 p-5 w-1/5 ${workout?.exercise.includes(item.id!) ? 'bg-green-200' : ''}`} onClick={() => updateWorkout(item)}>
                        <p className="text-center">{item.exercise_name}</p>
                        <p className="text-center">{item.description}</p>
                        <p className="text-center">{item.body_part}</p>
                    </div>
                </React.Fragment>
                ))}
            </div>

            <div className="p-6 border-t border-gray-200 rounded-b">
                    <button form='workout-form' className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3" type="submit">Update Workout</button>
                    <button className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3" onClick={handleDelete}>Delete Workout</button>
                    <Link href="/ViewWorkout" className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Go Back</Link>
            </div>
        </>
    )
}

export default UpdateWorkout;