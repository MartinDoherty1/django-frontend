"use client";
import React from 'react';
import ExerciseTypes from '../Models/ExerciseTypes';
import GetExerciseTypes from '../Services/GetExerciseTypes';
import { useQuery } from 'react-query';

const ExerciseTypesDisplay = () =>
{
    const {data: exerciseTypes} = useQuery<ExerciseTypes[], Error>(
        ['exerciseTypes'],
        GetExerciseTypes,
        {
            retry: (_failureCount, error) => error.message !== "No Results!!"
        }
    )
    
    return(
        <div className='flex flex-row flex-wrap justify-evenly'>
            { exerciseTypes && exerciseTypes.map((item,index) =>
                <React.Fragment key={index}>
                    <div className="border-4 rounded-full border-sky-500 m-10 p-5 w-1/5">
                        <h3>{item?.key}</h3>
                        <p>Number of exercises: {item?.doc_count}</p>
                    </div>
                </React.Fragment>
            )}
        </div>
    )
}

export default ExerciseTypesDisplay;