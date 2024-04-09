"use client";
import React, {useState} from 'react';
import searchExercises from '../../Services/ElasticSearches';
import DebouncedValue from '../../Utils/DebouncedValue';
import { useQuery } from 'react-query';
import Exercise from '../../Models/Exercise';
import Navbar from '../../Components/NavigationBar';

const Search = () =>
{
    const [searchTerm, setSearchTerm] = useState<string>("");

    const debouncedSearchTerm = DebouncedValue(searchTerm, 500);

    const {data: exerciseResults, error } = useQuery<Exercise[], Error>(
        ['exercises', debouncedSearchTerm],
        () => searchExercises(debouncedSearchTerm),
        {
            enabled: debouncedSearchTerm.length > 0,
            retry: (_failureCount, error) => error.message !== "No Results!!"
        }
    );

    return(
        <>
            <Navbar/>
            <div className='m-5'>
                
                <div className="flex flex-1 items-center justify-center p-6">
                    <div className="w-full max-w-lg">
                        <div className="mt-5 sm:flex sm:items-center">
                            <input id="search-bar" name='search-bar' 
                            className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" 
                            placeholder="Keyword" type="search" value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}/>
                        </div>
                    </div>
                </div>

                <br/>
                <br/>
                { (!debouncedSearchTerm && !error) && <h1 className='text-lime-400 underline uppercase text-xl'>Please Enter Search Term</h1> }
                <br/>
                { (error && debouncedSearchTerm) && <h1 className='text-rose-600 underline uppercase text-xl'>{error.message}</h1> }

                <div className='flex flex-row flex-wrap justify-evenly'>
                    {exerciseResults && exerciseResults.map((exercise, index) => (
                        <React.Fragment key={index}>
                            <div className="border-4 rounded-full border-sky-500 m-10 p-5 w-1/5">
                            <p className="text-center">{exercise.exercise_name}</p>
                            <p className="text-center">{exercise.description}</p>
                            <p className="text-center">{exercise.body_part}</p>
                            </div>
                            <br/>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Search;