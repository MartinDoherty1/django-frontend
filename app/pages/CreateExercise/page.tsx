"use client";
import React, {useState} from 'react';
import Exercise from '../../Models/Exercise';
import Link from 'next/link';
import Loading from '../../Components/Loading';
import { useMutation } from 'react-query';
import {createExercise} from '../../Services/CreateExercise';
import convertType from '../../Utils/ConvertShortHandToLongHand';
import ErrorWithExerciseMutation from '../../Components/ErrorWithExerciseMutation';
import ExerciseForm from '../../Components/ExerciseForm';
import Navbar from '../../Components/NavigationBar';
import { queryClient } from '../../Components/QueryClientProvider';

const CreateExercise = () =>
{
    const [newExercise, setNewExercise] = useState<Exercise | null>(null);

    const createExerciseMutation = useMutation(() => createExercise(newExercise!),
        {
            onError: (err:Error) => {
                console.error(`Error Creating Exercise: ${err.message}`);
            },
            onSettled: () => {
                queryClient.invalidateQueries('create');
            }
        })

    if (createExerciseMutation.isLoading) {
        return (
            <Loading/>
        )
    }
    
    if (createExerciseMutation.isError) {
        return (
            <ErrorWithExerciseMutation link='/' linkText='Back to Home Page' h1Text='Error Creating Exercise'/>
        )
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    {
        setNewExercise({ ...newExercise,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => 
    {
        event.preventDefault();
        createExerciseMutation.mutate();
    }

    return(
        <>
            <title>Create Exercise</title>
            <Navbar/>
            {createExerciseMutation.isSuccess ? (
                <div className="bg-gray-100 h-screen flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h1 className="text-4xl font-bold text-gray-800 mb-8">Created Successfully</h1>
                        <p className="text-gray-600 mb-6">Exercise Name: {newExercise!.exercise_name}</p>
                        <p className="text-gray-600 mb-6">Exercise Description: {newExercise!.description}</p>
                        <p className="text-gray-600 mb-6">Eercise Body Part: {newExercise!.body_part}</p>
                        <p className="text-gray-600 mb-6">Exercise Type: {convertType(newExercise!.type!)}</p>
                        <a href="/" className="inline-block py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold">Go
                            back to Home Screen</a>
                    </div>
                </div>
            ) : (

            <div className="bg-white border border-4 rounded-lg shadow relative m-10">

                <div className="flex items-start justify-between p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold">
                        Create Exercise
                    </h3>
                </div>
                
                <ExerciseForm handleChangeMethod={handleChange} handleSubmitMethod={handleSubmit} ExerciseBeingChanged={newExercise} />

                <div className="p-6 border-t border-gray-200 rounded-b">
                    <button form='exercise-form' className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3" type="submit">Create Exercise</button>
                    <Link href="/" className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Go Back</Link>
                </div>

            </div>

            )} 
        </>
    )
}



export default CreateExercise;