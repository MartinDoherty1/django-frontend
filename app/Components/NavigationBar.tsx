import Link from "next/link";
import React from "react";
import { SignupButton } from "./buttons/signup-button";
import { LoginButton } from "./buttons/login-button";
import { LogoutButton } from "./buttons/logout-button";

interface Props {
    isLoggedIn: Boolean
}

const Navbar = ({isLoggedIn}: Props) =>
{
    return(

    <header className="lg:px-16 px-4 bg-blue-600 flex flex-wrap items-center py-4 shadow-md">
        <div className="flex-1 flex justify-between items-center text-white">
            <a href="/" className="text-xl">Marty Doc</a>
        </div>

        <div className="hidden md:flex md:items-center md:w-auto w-full" id="menu">
            <nav>
                <ul className="md:flex items-center justify-between text-base text-white pt-4 md:pt-0">
                    <li><Link className="md:p-4 py-3 px-0 block" href="/pages/Search">Search</Link></li>
                    <li><Link className="md:p-4 py-3 px-0 block" href="/pages/CreateExercise">Create Exercise</Link></li>
                    <li><Link className="md:p-4 py-3 px-0 block" href="/pages/CreateWorkout">Create Workout</Link></li>
                    {!isLoggedIn && (
                        <>
                            <SignupButton/>
                            <LoginButton/>
                        </>
                    )}
                    {isLoggedIn && (
                        <LogoutButton/>
                    )}
                </ul>
            </nav>
        </div>
    </header>
    )
}

export default Navbar;