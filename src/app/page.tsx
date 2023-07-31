import React from "react";

import { getCurrentUser } from "@/lib/get-current-user";
import { OAuthLoginButton } from "@/components/oauth-login-button";

export default async function Home() {
    const user = await getCurrentUser();
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
            {user ? (
                <div>
                    <p className="mt-2">
                        Logged in as <span className="font-medium">{user.email}</span>.
                    </p>
                </div>
            ) : (
                <div className="w-1/6 mt-2">
                    <OAuthLoginButton provider="google" />
                </div>
            )}
        </div>
    );
}
