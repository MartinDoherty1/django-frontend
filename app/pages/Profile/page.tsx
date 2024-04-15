"use server";
import { NextPage } from "next";
import React from "react";
import Image from "next/image";
import { getSession } from "@auth0/nextjs-auth0";
import { error } from "console";
import Navbar from "../../Components/NavigationBar";

const Profile: NextPage = async () => {
  const session = await getSession();

  if(!session)
  {
    throw error(`require auth`);
  }
  const {user} = session;

  
  return (
    <>
        <title>Profile</title>
        {session ? (<Navbar isLoggedIn={true}/>) : (<Navbar isLoggedIn={false}/>)}
        <div className="content-layout">
          <div className="content__body">
              <div className="profile-grid">
              <div className="profile__header">
                  {user.picture && (
                  <Image
                      src={user.picture}
                      alt="Profile"
                      className="profile__avatar"
                      width={80}
                      height={80}
                  />
                  )}
                  <div className="profile__headline">
                  <h2 className="profile__title">{user.name}</h2>
                  <span className="profile__description">{user.email}</span>
                  </div>
              </div>
              <div className="profile__details">
                  <p>{JSON.stringify(user, null, 2)}</p>
              </div>
              </div>
          </div>
        </div>
    </>
  );
};

export default Profile;