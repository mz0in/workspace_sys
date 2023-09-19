"use client";

import React from "react";

import type { Team } from "@prisma/client";

import { FormGroup, FormGroupTitle } from "@/components/ui/form";
import { AlertDeleteDialog } from "@/components/settings/alert-delete-dialog";

interface Props {
    team: Pick<Team, "slug" | "name">;
}

export function DeleteTeam({ team }: Props) {
    async function deleteTeam() {}
    return (
        <FormGroup separate={false} className="w-1/2">
            <FormGroupTitle>Delete team</FormGroupTitle>
            <p className="text-sm text-zinc-500">
                Deleting the team will also permanently delete all data associated with it. This
                action can&apos;t be undone and your data cannot be recovered.
            </p>
            <AlertDeleteDialog
                deleteItem="team"
                deleteConfirmText={team.name}
                onDelete={() => deleteTeam()}
            />
        </FormGroup>
    );
}
