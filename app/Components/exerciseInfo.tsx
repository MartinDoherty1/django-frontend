
"use client";
import React from 'react';
import { useQuery } from 'react-query';
import Exercise from '../Models/Exercise';
import Link from 'next/link';
import {GetExercises} from '../Services/GetExercises';

const ExerciseInfo  = () => {

    const {data: exerciseResults, error} = useQuery<Exercise[], Error>(
      ['exercises'],
      GetExercises,
      {
        retry: (_failureCount, error) => error.message !=="No Results!!"
      }
    );

    return (
        <>
          <div className='flex flex-row flex-wrap justify-evenly'>
            {exerciseResults && exerciseResults.map((item,index) => (
              <React.Fragment key={index}>
                  <div className="border-4 hover:bg-gray-400 rounded-full border-sky-500 m-10 p-5 w-1/5">
                    <Link href={`/UpdateExercise?exerciseId=${item.id}`}>
                      <p className="text-center">{item.exercise_name}</p>
                      <p className="text-center">{item.description}</p>
                      <p className="text-center">{item.body_part}</p>
                    </Link>
                  </div>
                <br/>
              </React.Fragment>
            ))}
          </div>
        </>
      );
};

export default ExerciseInfo;
