"use client";
import React from "react";
import ExerciseInfo from "./Components/exerciseInfo";
import ExerciseTypes from "./Components/exerciseCategories";
import Navbar from "./Components/NavigationBar";

export default function Home() {

  return (
    <>
        <Navbar/>
        <ExerciseInfo/>
        <ExerciseTypes/>
    </>
  );
}
