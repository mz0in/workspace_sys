import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="flex flex-col p-2">
            <h1 className="font-medium text-xl">
                Build your own{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
                    workspace
                </span>
                .
            </h1>
            <p className="text-sm">
                Manage your events, projects, tasks, and automate repetitive tasks using AI.
            </p>
            <Button variant="outline" className="w-48 mt-2 space-x-2">
                <Image src="/google.svg" width={14} height={14} alt="" />
                <span>Login with Google</span>
            </Button>
        </div>
    );
}
