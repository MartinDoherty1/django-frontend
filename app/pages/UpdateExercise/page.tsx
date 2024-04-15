"use client";
import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Exercise from "../../Models/Exercise";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loading from "../../Components/Loading";
import convertType from "../../Utils/ConvertShortHandToLongHand";
import { GetExerciseById } from "../../Services/GetExercises";
import { changeExercise, deleteExerciseById } from "../../Services/CreateExercise";
import { queryClient } from '../../Components/QueryClientProvider';
import Navbar from "../../Components/NavigationBar";
import ErrorWithExerciseMutation from "../../Components/ErrorWithExerciseMutation";
import ExerciseForm from "../../Components/ExerciseForm";

const UpdateExercise = () =>
{
    const [updateExercise, setUpdateExercise] = useState<Exercise | null>(null);
    const [sameExercise, setSameExercise] = useState<boolean>(false);
    const SearchParams = useSearchParams();

    const { user } = useUser();
    const  exerciseId  = SearchParams.get('exerciseId');

    const {data: originalExercise} = useQuery<Exercise, Error>(
        ['exercises'],
        () => GetExerciseById(exerciseId!),
        {
          retry: (_failureCount, error) => error.message !=="No Results!!",
          enabled: exerciseId !== undefined,
          onSuccess: (data) =>
          {
            setUpdateExercise(data)
          }
        }
      );

    const updateExerciseMutation = useMutation(() => changeExercise(updateExercise!, exerciseId!),
    {
        onError: (err:Error) => {
            console.error(`Error Creating Exercise: ${err.message}`);
        },
        onSettled: () => {
            queryClient.invalidateQueries('update');
        }
    })

    const deleteExerciseMutation = useMutation(() => deleteExerciseById(exerciseId!),
    {
        onError: (err:Error) => {
            console.error(`Error Deleting Exercise: ${err.message}`);
        },
        onSettled: () => {
            queryClient.invalidateQueries('update');
        }
    })

    

    if (updateExerciseMutation.isLoading || deleteExerciseMutation.isLoading) {
        return (
            <Loading/>
        )
    }

    if (updateExerciseMutation.isError) {
        return (
            <ErrorWithExerciseMutation h1Text="Error Updating Exercise" link="/" linkText="Back to home Page"/>
        )
    }

    if(deleteExerciseMutation.isSuccess) {
        return (
            <div className="bg-gray-100 h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">Deleted Successfully</h1>
                    <a href="/" className="inline-block py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold">Go
                        back to Home Screen</a>
                </div>
            </div>
        )
    }

    if (deleteExerciseMutation.isError) {
        return (
            <ErrorWithExerciseMutation h1Text="Error Deleting Exercise" link="/" linkText="Back to home Page"/>
        )
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => 
    {
        event.preventDefault();
        if(updateExercise == originalExercise)
        {
            setSameExercise(true);
            return;
        }

        updateExerciseMutation.mutate();
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
    {
        setUpdateExercise({
            ...updateExercise,
            [e.target.name]: e.target.value
        })
    } 

    const handleDelete = () =>
    {
        deleteExerciseMutation.mutate();
    }

    return(
    <>
        <title>Update Exercise</title>
        <Navbar isLoggedIn={user ? true : false }/>
        {updateExerciseMutation.isSuccess ? (
            <div className="bg-gray-100 h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">Updated Successfully</h1>
                    <p className="text-gray-600 mb-6">Exercise Name: {updateExercise!.exercise_name}</p>
                    <p className="text-gray-600 mb-6">Exercise Description: {updateExercise!.description}</p>
                    <p className="text-gray-600 mb-6">Eercise Body Part: {updateExercise!.body_part}</p>
                    <p className="text-gray-600 mb-6">Exercise Type: {convertType(updateExercise!.type!)}</p>
                    <a href="/" className="inline-block py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold">Go
                        back to Home Screen</a>
                </div>
            </div>
        ) : (
            <>
                <div className="bg-white border border-4 rounded-lg shadow relative m-10">

                    <div className="flex items-start justify-between p-5 border-b rounded-t">
                        <h3 className="text-xl font-semibold">
                            Update Exercise
                        </h3>
                    </div>

                    <ExerciseForm handleChangeMethod={handleChange} handleSubmitMethod={handleSubmit} ExerciseBeingChanged={updateExercise} />

                    <div className="p-6 border-t border-gray-200 rounded-b">
                        <button form='exercise-form' className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3" type="submit">Update Exercise</button>
                        <button className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3" onClick={handleDelete}>Delete Exercise</button>
                        <Link href="/" className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Go Back</Link>
                    </div>
                </div>
                {sameExercise && (
                        <div className="bg-red-200 px-6 py-4 mx-2 my-4 rounded-md text-lg max-w-[80%] flex items-center mx-auto max-w-lg">
                            <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                                <path fill="currentColor"
                                    d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
                                </path>
                            </svg>
                            <span className="text-red-800">No Changes</span>
                        </div>
                )}
            </>
        )} 
    </>
    )
}

export default UpdateExercise;