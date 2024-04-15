import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

export const config = {
    matcher: ["/pages/Search","/pages/Profile", "/pages/UpdateExercise", "/pages/UpdateWorkout","/pages/CreateExercise","/pages/CreateWorkout", "/pages/ViewWorkout"],
};