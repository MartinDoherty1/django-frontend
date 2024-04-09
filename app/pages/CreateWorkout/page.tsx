"use client";
import React, {useState} from 'react';
import Exercise from '../../Models/Exercise';
import { useQuery, useMutation } from 'react-query';
import Link from 'next/link';
import { queryClient } from '../../Components/QueryClientProvider';
import Loading from '../../Components/Loading';
import { GetExercises } from "../../Services/GetExercises";
import Workout from "../../Models/Workout";
import Navbar from '../../Components/NavigationBar';
import { createWorkout } from '../../Services/CreateWorkout';


const CreateWorkout = () => 
{
    const [exercises, setExercises] = useState<Exercise[] | null>(null);

    const [workout, setWorkout] = useState<Workout>({workout_name: "", exercise: []});

    useQuery<Exercise[], Error>(
        ['exercises'],
        GetExercises,
        {
          retry: (_failureCount, error) => error.message !=="No Results!!",
          onSuccess: (data) =>
          {
            setExercises(data)
          }
        }
    ); 

    const createWorkoutMutation = useMutation(() => createWorkout(workout),
    {
        onError: (err:Error) => {
            console.error(`Error Creating Workout: ${err.message}`);
        },
        onSettled: () => {
            queryClient.invalidateQueries('create');
        }
    })

    if(createWorkoutMutation.isSuccess)
    {
        let selectedExercises = exercises?.filter((item) => workout.exercise.some((selectedId) => item.id! === selectedId));

        return (
            <div className="bg-gray-100 h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">Created Successfully</h1>
                    <p className="text-gray-600 mb-6">Exercise Name: {workout!.workout_name}</p>
                    <p className="text-gray-600 mb-6">Exercises:</p>
                    {selectedExercises && selectedExercises.map((item,index) => (
                    <React.Fragment key={index}>
                        <p className="text-left">{item.exercise_name}</p>
                        <br/>
                    </React.Fragment>
                    ))}
                    <a href="/" className="inline-block py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold">Go
                        back to Home Screen</a>
                </div>
            </div>
        )
    }

    if (createWorkoutMutation.isLoading) {
        return (
            <Loading/>
        )
    }

    function updateWorkout(selectedExercise: Exercise) {

        const id: number = selectedExercise.id!;

        if(!workout.exercise.includes(id))
        {
            setWorkout((prev) => ({
                ...prev,
                exercise: [...prev.exercise, id],
            }))
            return
        }

        if(workout.exercise.includes(id))
        {
            const updatedWorkoutList = workout.exercise.filter((exerciseId) => exerciseId !== id);

            setWorkout((prev) => ({
                ...prev,
                exercise: updatedWorkoutList,
            }))
            return
        }
    }

    function handleSubmission(event: React.FormEvent<HTMLFormElement>) 
    {
        event.preventDefault();
        if(workout.exercise.length == 0 || workout.workout_name.length == 0)
        {
            return;
        }

        createWorkoutMutation.mutate();
    }

    function workoutNameChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        setWorkout({ ...workout,
            [event.target.name]: event.target.value
        })
    }

    return (
        <>
            <title>Create Workout</title>
            <Navbar/>
            <div className="p-6 space-y-6">
                <form id='workout-form' onSubmit={handleSubmission}>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="workout_name" className="text-sm font-medium text-gray-900 block mb-2">Workout Name</label>
                            <input type='text' placeholder='Workout Name' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            required  id="workout_name" name="workout_name" maxLength={50} value={workout?.workout_name ?? ''}  onChange={workoutNameChange}/>
                        </div>
                    </div>
                </form>
            </div>
            {exercises && exercises.map((item,index) => (
              <React.Fragment key={index}>
                  <div className={`border-4 rounded hover:bg-gray-400 border-sky-500 m-10 p-5 w-1/5 ${workout.exercise.includes(item.id!) ? 'bg-green-200' : ''}`} onClick={() => updateWorkout(item)}>
                      <p className="text-center">{item.exercise_name}</p>
                      <p className="text-center">{item.description}</p>
                      <p className="text-center">{item.body_part}</p>
                  </div>
                <br/>
              </React.Fragment>
            ))}

            <div className="p-6 border-t border-gray-200 rounded-b">
                <button form='workout-form' className="text-white bg-blue-500 hover:bg-green-500 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3" type="submit">Create Workout</button>
                <Link href="/" className="text-white bg-blue-500 hover:bg-red-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Go Back</Link>
            </div>
        </>
    )
}

export default CreateWorkout;