import React from "react";
import { notFound, redirect } from "next/navigation";

import { userBelongsToTeam } from "@/lib/auth/user-permission-utils";
import { db } from "@/lib/database";
import { getCurrentUser } from "@/lib/get-current-user";
import { PageHeader, PageTitle } from "@/components/layout/page-header";
import { TeamSettingsTabs } from "@/components/settings/team-settings";

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
                <PageTitle>Settings</PageTitle>
            </PageHeader>
            <TeamSettingsTabs team={team} />
        </div>
    );
}
