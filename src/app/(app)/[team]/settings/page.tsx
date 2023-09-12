import React from "react";
import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/database";
import { userBelongsToTeam } from "@/lib/auth/user-permission-utils";
import { getCurrentUser } from "@/lib/get-current-user";
import { PageHeader, PageTitle } from "@/components/layout/page-header";

export default async function TeamSettings({ params }: { params: { team: string } }) {
    const user = await getCurrentUser();
    if (!user) {
        return redirect("/");
    }
    const userInTeam = await userBelongsToTeam(user.id, params.team);
    if (!userInTeam) {
        return notFound();
    }
    const team = await db.team.findFirstOrThrow({ 
        where: { 
            slug: params.team, 
        },
        include: {
            members: true,
        },
    });
    return (
        <div className="flex flex-col px-[1rem] md:px-[2rem]">
            <PageHeader>
                <PageTitle>{team.name} Settings</PageTitle>
            </PageHeader>
            <pre>{JSON.stringify(team, null, 2)}</pre>
        </div>
    );
}
