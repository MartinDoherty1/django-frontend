import { NextPage } from "next";
import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Test: NextPage = withPageAuthRequired(
    async () => {
        const user = await fetch("test");

        return(
            <div>Test</div>
        )
    },
    {returnTo: "/test"}
);

export default Test;