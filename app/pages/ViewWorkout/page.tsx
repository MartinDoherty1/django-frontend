"use client";
import Navbar from "../../Components/NavigationBar";
import { useQuery } from "react-query";
import Link from "next/link";
import React from "react";
import Workout from "../../Models/Workout";
import { GetWorkouts } from "../../Services/CreateWorkout";

const ViewWorkout = () => {

    const {data: workoutResults, error} = useQuery<Workout[], Error>(
        ['workouts'],
        GetWorkouts,
        {
          retry: (_failureCount, error) => error.message !=="No Results!!"
        }
    );

    return(
        <>
            <title>View Workout</title>
            <Navbar/>
            <div className="flex flex-wrap flex-row justify-center">
                {workoutResults && workoutResults.map((item,index) => (
                        <React.Fragment key={index}>
                            <div className="border-4 hover:bg-gray-400 rounded-full border-sky-500 m-10 p-5 w-1/5">
                                <Link href={`/UpdateWorkout?workoutId=${item.id?.toString()}`}>
                                    <p className="text-center">{item.workout_name}</p>
                                </Link>
                            </div>
                        </React.Fragment>
                ))}
            </div>
        </>
    )
}

export default ViewWorkout;