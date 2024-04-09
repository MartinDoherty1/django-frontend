
export const API_URLS =
{
    GET_POST_EXERCISES: process.env.NEXT_PUBLIC_DJANGO_API_BASE + "/gym/exercises/",
    GET_EXERCISE_TYPES: process.env.NEXT_PUBLIC_DJANGO_API_BASE + "/search/exerciseTypes/",
    SEARCH_EXERCISES: process.env.NEXT_PUBLIC_DJANGO_API_BASE + "/search/exercise/", // will require search term appended
    GET_POST_WORKOUT: process.env.NEXT_PUBLIC_DJANGO_API_BASE + "/gym/workouts/"
}