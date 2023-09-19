import React from "react";

import { Team, TeamMembership } from "@prisma/client";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditTeamForm } from "@/components/settings/edit-team-form";

import { DeleteTeam } from "./delete-team";

interface Props {
    team: Team & { members: TeamMembership[] };
}

export function TeamSettingsTabs({ team }: Props) {
    return (
        <Tabs defaultValue="general">
            <TabsList className="mx-3 my-2">
                <TabsTrigger value="general">General</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="flex flex-col px-3">
                <div>
                    <h1 className="text-foreground font-medium text-xl">General</h1>
                    <h3 className="text-sm">Manage team settings</h3>
                    <Separator className="my-2" />
                </div>
                <EditTeamForm team={team} />
                <DeleteTeam team={{ slug: team.slug, name: team.name }} />
            </TabsContent>
        </Tabs>
    );
}
