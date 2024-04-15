"use client";
import React from "react";
import ExerciseInfo from "./Components/exerciseInfo";
import { useUser } from "@auth0/nextjs-auth0/client";
import ExerciseTypes from "./Components/exerciseCategories";
import Navbar from "./Components/NavigationBar";



export default function Home() {

  const { user } = useUser();

  return (
    <>
        <Navbar isLoggedIn={user ? true : false }/>
        <ExerciseInfo/>
        <ExerciseTypes/>
    </>
  );
}
