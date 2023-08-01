import React from "react";

import { OAuthLoginButton } from "@/app/(marketing)/oauth-login-button";

export default async function Home() {
    return (
        <div className="flex flex-col p-2">
            <h1 className="font-cal text-xl">
                Build your own{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                    workspace
                </span>
                .
            </h1>
            <p className="text-sm">
                Manage your events, projects, tasks, and automate repetitive tasks using AI.
            </p>
            <div className="flex items-center space-x-2 mt-2">
                <OAuthLoginButton provider="google" />
                <OAuthLoginButton provider="github" />
            </div>
        </div>
    );
}
